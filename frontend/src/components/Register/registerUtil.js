import axios from 'axios'

export function registerUser(newUserDetails){
    let apiUrl = 'http://54.159.225.120:8080/register'
    return axios.post(apiUrl,newUserDetails,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
