import actionTypes from './actionTypes'
import signs from './signs'
import calls from './calls'
import {DefaultState} from './../../reducers/locationReducer'

//Obtiene todas las provincias
function getProvince (state: DefaultState, response: any){
    return {
        ...state, 
        failure: false,
        provinces:  { keys: Object.keys(response), values: response} //se crea objeto con un array de Keys y su respectivo valor
    }
}
//Obtiene todas los cantones de una provincia
function getCantonsByProvince (state: DefaultState, response: any){
    return {
        ...state,
        failure: false,
        cantons: { keys: Object.keys(response), values: response} //se crea objeto con un array de Keys y su respectivo valor
    }
}
//Obtiene todas los distritos de un canton
function getDistrictsByCanton (state: DefaultState,response: any){
    return {
        ...state,
        failure: false,
        districts:  { keys: Object.keys(response), values: response} //se crea objeto con un array de Keys y su respectivo valor
    }
}
//Indicar que se espera respuesta de conexion
function loading (state: DefaultState, response: boolean){
    return{
        ...state,
        loading: response
    }
}
//Indica si hubo un fallo
function failure (state: DefaultState, response: boolean){
    return{
        ...state,
        failure: response
    }
}

const actionsLocation ={
    actionTypes: actionTypes,
    signs: signs,
    calls: calls,
    actions:{
        getProvince: getProvince,
        getCantonsByProvince: getCantonsByProvince,
        getDistrictsByCanton: getDistrictsByCanton,
        loading: loading,
        failure: failure
    }
}

export default actionsLocation