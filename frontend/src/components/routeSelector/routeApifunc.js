import axios from 'axios'

export async function getRoutesFromApi(startCity, destination, date) {
    const baseURL = "http://54.85.78.106:8080/booking/"
    return await axios.post(baseURL, { startCity, destination, date })
}
