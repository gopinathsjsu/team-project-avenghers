import React, { useState } from 'react'
import './Routeselector.css'
import * as apiCall from './routeApifunc'
import FlightList from '../FlightList/FlightList'

const cities = [
    'SanJose', 'Oakland', 'SanFrancisco', 'SaltLakeCity', 'Atlanta', 'New York', 'Dallas', 'Houston', 'Fresno', 'Tampa', 'Manhattan', 'Portland', 'Boston', 'Rochester', 'Billings', 'Lebanon', 'Oklahoma City', 'Charlotte', 'Memphis', 'San Antonio', 'Burlington', 'Pasco', 'Rock Springs', 'LosAngeles', 'Austin', 'Boise', 'SanDiego', 'Chicago', 'Denver', 'Las Vegas', 'Phoenix', 'Sanford', 'Springfield', 'Lexington', 'Baltimore', 'Detroit', 'Jackson', 'Reno', 'Newburgh', 'Portland', 'Columbia', 'Brownsville', 'St. George', 'Richmond', 'Seattle', 'Ponce'
].sort();

export default function Routeselector({ history }) {
    const [dataInp, setData] = useState([])
    const [startCity, setStartCity] = useState('')
    const [destination, setDestination] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

    const [fromList, setFromList] = useState(cities);
    const [toList, setToList] = useState(cities);
    const [dataNotFound, setDataNotFound] = useState(false);

    const handleToCity = e => {
        e.preventDefault()
        setFromList(cities.filter(city => city !== e.target.value));
        setDestination(cities.includes(e.target.value) ? e.target.value : "")
        localStorage.setItem("destination", e.target.value)
    }
    const handleFromCity = e => {
        e.preventDefault()
        setToList(cities.filter(city => city !== e.target.value));
        setStartCity(cities.includes(e.target.value) ? e.target.value : "")
        localStorage.setItem("start", e.target.value)
    }

    const renderFromList = () => {
        return fromList.map(city => (<option selected={startCity === city ? "selected" : ""}>{city}</option>));
    }

    const renderToList = () => {
        return toList.map(city => (<option selected={destination === city ? "selected" : ""}>{city}</option>));
    }

    const renderFlightList = (dataInp) => {
        if (dataInp.length > 0) {
            return (<FlightList value={dataInp} history={history} />)
        }
    }

    const getRoutes = e => {
        e.preventDefault();
        if(!startCity || !destination) return false;
        apiCall.getRoutesFromApi(startCity, destination, selectedDate)
            .then(response => response.data)
            .then(({ status, flights }) => {
                if (status && flights.length > 0) {
                    setData(flights);
                    setDataNotFound(false);
                } else {
                    setDataNotFound(true);
                }
            })
    }

    const handleDate = e => {
        e.preventDefault()
        setSelectedDate(e.target.value)
        localStorage.setItem("date", e.target.value)
    }

    return (
        <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                <form className="form-inline" onSubmit={e => getRoutes(e)}>
                    <select value={startCity} name="ad_account_selected" placeholder="From" data-style="btn-new" class="selectpicker" onChange={e => { handleFromCity(e) }}>
                        <option>--From--</option>
                        {renderFromList()}
                    </select>
                    <select value={destination} name="ad_account_selected" placeholder="To" data-style="btn-new" class="selectpicker" onChange={e => { handleToCity(e) }} style={{ marginLeft: "10px" }}>
                        <option>--To--</option>
                        {renderToList()}
                    </select>
                    <input value={selectedDate} min={selectedDate} onChange={e => { handleDate(e) }} type="date" />
                    <input type="submit" className=" btn btn-primary btn-md getRoute" />
                </form>
                <div>
                    {renderFlightList(dataInp)}
                    {dataNotFound &&
                        <div className="dataNotFound"> No airlines found with specific search</div>
                    }
                </div>
            </div>
        </div >
    )
}
