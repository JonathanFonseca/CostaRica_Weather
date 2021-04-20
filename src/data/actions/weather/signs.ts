import actionType from './actionTypes'

//Obtiene el clima de un sitio
const getWeather=(payload: any) =>({
    type: actionType.GET_WEATHER,
    payload: {...payload}
})

//indica que se espera respuesta de la conexion
const loading=(payload: boolean) =>({
    type: actionType.LOADING,
    payload: payload
})
//indica si hubo un fallo
const failure=(payload: boolean) =>({
    type: actionType.FAILURE,
    payload: payload
})

const signs ={
    getWeather: getWeather,
    loading: loading,
    failure: failure
}

export default signs