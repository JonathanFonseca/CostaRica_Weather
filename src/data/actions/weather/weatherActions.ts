import signs from './signs'
import calls from './calls'
import actionTypes from './actionTypes'
import {DefaultState} from './../../reducers/weatherReducer'

//Obtiene el clima de un sitio
function getWeather(state: DefaultState, response: any){
    return{
        ...state,
        main: response.main,
        wind: response.wind.speed,
        failure: false
    }
}
//indica si hubo un fallo
function failure(state: DefaultState, response: any){
    return{
        ...state,
        wind: "",
        main:[],
        failure: response,
        loading: true
    }
}
//indica que se espera respuesta de la conexion
function loading(state: DefaultState, response: any){
    return{
        ...state,
        loading: response
    }
}

const actions={
    actionTypes: actionTypes,
    calls: calls,
    signs: signs,
    actions:{
        getWeather: getWeather,
        failure: failure,
        loading: loading
    }
}

export default actions