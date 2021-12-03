import React, { useState, useEffect } from 'react'
import { FaAngleDoubleDown } from "react-icons/fa";
import './FlightList.css'
export default function FlightList({ value: dataInp, history }) {

    const [obj, setObj] = useState('')
    const [arrowDown, setArrowDown] = useState(false)
    const [clas, SetClas] = useState(true)

    useEffect(() => {
        setObj(dataInp)
    }, [dataInp])

    const handleSubmit = flight => {

        localStorage.setItem("selectedflightId", flight._id)
        localStorage.setItem("pricePerSeat", flight.pricePerSeat)
        localStorage.setItem("milesCovered", flight.milescovered)
        localStorage.setItem("flightName", flight.CompanyName)
        localStorage.setItem("flightNumber", flight.planeNumber)

        SetClas(false)
        setArrowDown(true)
        history.push("/Seat")
    }

    const renderFunction = () => {
        return dataInp.map((flight, idx) => {
            return (
                <div key={idx} className="card mt-5 FlightList">
                    <div class="row ml-3" style={{paddingTop: "10px"}}>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Brand</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">From</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">To</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Price</div>

                        <div class="w-100 d-none d-md-block"></div>

                        <div class="col-5 col-sm-3 mb-4">{flight.CompanyName}</div>
                        <div class="col-5 col-sm-3 mb-4">{flight.startCity}</div>
                        <div class="col-5 col-sm-3 mb-4">{flight.destination}</div>
                        <div class="col-5 col-sm-3 mb-4">{flight.pricePerSeat}</div>
                        <div class="col-5 col-sm-4 mb-2 ml-0" style={{ margin: "10px", float: "right" }}>

                            <button className={clas ? "btn btn-primary btn-md" : "btn btn-primary btn-md disabled"} onClick={(bId) => { handleSubmit(flight) }} style={{ float: "right" }} >Book Now</button>

                        </div>
                    </div>
                </div >
            )
        })
    }
    return (
        <div className="">
            {renderFunction()}
            <div className={arrowDown ? "activeArrow" : "nonActive"}>
                <FaAngleDoubleDown />
            </div>
        </div>
    )
}
