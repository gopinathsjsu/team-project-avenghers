import axios from 'axios'

export async function getRoutesFromApi(startCity, destination, date) {
    const baseURL = "http://54.159.225.120:8080/booking/"
    return await axios.post(baseURL, { startCity, destination, date })
}
