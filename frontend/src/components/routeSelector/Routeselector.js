import React, { useState } from 'react'
import './Routeselector.css'
import * as apiCall from './routeApifunc'
import FlightList from '../FlightList/FlightList'
const mockFlightList = [
    {
        _id: "1",
        seatArray: "",
        companyName: "Airlines",
        startCity: "Hyderabad",
        destination: "Chennai",
        pricePerSeat: "1800"
    }
]
const cities = [
    'SanJose', 'Oakland', 'SanFrancisco','SaltLakeCity', 'Atlanta', 'New York','Dallas', 'Houston', 'Fresno','Tampa', 'Manhattan', 'Portland','Boston', 'Rochester', 'Billings','Lebanon', 'Oklahoma City', 'Charlotte','Memphis', 'San Antonio', 'Burlington','Pasco', 'Rock Springs', 'LosAngeles','Austin', 'Boise', 'SanDiego','Chicago', 'Denver', 'Las Vegas','Phoenix', 'Sanford', 'Springfield','Lexington', 'Baltimore', 'Detroit','Jackson', 'Reno', 'Newburgh','Portland', 'Columbia', 'Brownsville','St. George', 'Richmond', 'Seattle','Ponce'
]

export default function Routeselector() {
    const [dataInp, setData] = useState(mockFlightList)
    const [startCity, setStartCity] = useState('')
    const [destination, setDestination] = useState('')

    const [fromList, setFromList] = useState(cities);
    const [toList, setToList] = useState(cities);

    const handleToCity = e => {
        e.preventDefault()
        setFromList(cities.filter(city => city !== e.target.value));
        setDestination(e.target.value)
        localStorage.setItem("destination", e.target.value)
    }
    const handleFromCity = e => {
        e.preventDefault()
        setToList(cities.filter(city => city !== e.target.value));
        setStartCity(e.target.value)
        localStorage.setItem("start", e.target.value)
    }

    const renderFromList = () => {
        return fromList.map(city => (<option selected={startCity === city ? "selected" : ""}>{city}</option>));
    }

    const renderToList = () => {
        return toList.map(city => (<option selected={destination === city ? "selected" : ""}>{city}</option>));
    }

    const renderFlightList = (dataInp) => {
        if (Object.keys(dataInp).length > 0) {
            return (<FlightList value={dataInp} />)
        }
    }

    const getRoutes = e => {
        e.preventDefault()
        apiCall.getRoutesFromApi(startCity, destination)
            .then(response => response.data)
            .then(({status, flights}) => {
                if(status) {
                    setData(flights);
                }                
            })
    }

    const handleDate = e => {
        e.preventDefault()
        //    console.log(e.target.value)
        localStorage.setItem("date", e.target.value)
    }

    return (
        <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                <form className="form-inline" onSubmit={e => getRoutes(e)}>
                    <select name="ad_account_selected" placeholder="From" data-style="btn-new" class="selectpicker" onChange={e => { handleFromCity(e) }}>
                        <option>--From--</option>
                        {renderFromList()}
                    </select>
                    <select name="ad_account_selected" placeholder="To" data-style="btn-new" class="selectpicker" onChange={e => { handleToCity(e) }}>
                        <option>--To--</option>
                        {renderToList()}
                    </select>
                    <input onChange={e => { handleDate(e) }} type="date"></input>
                    <input type="submit" className=" btn btn-primary btn-md getRoute" />
                </form>

                <div>
                    {renderFlightList(dataInp)}
                </div>
            </div>
        </div>
    )
}
