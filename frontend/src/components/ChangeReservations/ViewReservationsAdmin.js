
import './Reservation.css'
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";
//import MaterialTable, { Column } from "@material-table/core";
// export default function ViewReservation({ history }) {

//     const handleSignOut = e => {
//         e.preventDefault()
//         sessionStorage.removeItem('authToken')
//         localStorage.removeItem('reservedSeats')
//         localStorage.removeItem('nameData')
//         localStorage.clear()
//         history.push('/')
//     }
//     const handleBookAgainIcon = e => {
//         e.preventDefault()
//         history.push('/routes')
//     }
// //this is where integration of material table is done


function ViewReservation() {
    //   console.log(fetchFlights);
    const url = `http://localhost:8080/ViewBookings/`
    var columns = [
      {
        title: "Name of the passenger",
        field: "name",
      },
      { title: "Flight Name", field: "flightnumber" },
  
      {
        title: "Source",
        field: "startCity",
      },
      {
        title: "Destination",
        field: "destination",
      },
      { title: "Date", field: "dates", type: "date" },
  
      { title: "price", field: "price", type: "numeric" },
      {
        title:"Actions",
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Update
            </Button>
          );
        }
      }
  
    ];
    const handleClick = (param, event) => {
      event.stopPropagation();
    };
    const [data, setData] = useState([]);
    const [gridApi, setGridApi] = useState(null)
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const axios = require('axios');

   
    useEffect(() => {
      axios.get("http://localhost:8080/ViewBookings/")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((error) => {
          console.log("Error");
        });
    }, []);
//this is where it ends
    return (

        <div className="container">
            
                <Grid container spacing={1}>
        <Grid item xs={0}></Grid>
        <Grid item xs={0}>
          
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
                    <h3>Your Bookings!</h3>
                    <MaterialTable
            title="View current bookings"
            columns={columns}
           
            data={data}
           
            options={{
               
               selection:false


            }}
            
            // icons={tableIcons}
            />
          
            </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
        



    )
   }

export default ViewReservation;