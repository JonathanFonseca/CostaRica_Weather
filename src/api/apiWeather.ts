import axios from 'axios'

const api= axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
})

const get=(city: string)=>{
    return api.get(`weather?q=${city},cr&appid=2d6b2b55e10f8741c711c67d81f1ed9e&units=imperial`)
}
const methods= {
    get: get
}
export default methods;