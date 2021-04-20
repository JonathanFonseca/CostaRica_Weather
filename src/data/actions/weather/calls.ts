import signs from './signs'
import api from './../../../api/api'
import {Dispatch} from 'redux'

//Realiza conexion al api para obtener el clima de una ciudad
const fetchWeather = (city: string) => async (dispatch: Dispatch)=>{
    dispatch(signs.loading(true))
    await api.apiWeather.get(city)
    .then(response=>{
        if(response.status===200){//Si hubo respuesta
            dispatch(signs.getWeather(response.data))
        }else{//En caso de fallo de conexion
            dispatch(signs.failure(false))    
        }
        dispatch(signs.loading(false))
    }).catch(error=>{
        dispatch(signs.failure(true))
    })
}

const calls={
    fetchWeather: fetchWeather
}

export default calls