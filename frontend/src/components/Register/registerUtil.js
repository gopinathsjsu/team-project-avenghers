import axios from 'axios'

export function registerUser(newUserDetails){
    let apiUrl = 'http://54.85.78.106:8080/register'
    return axios.post(apiUrl,newUserDetails,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
