import actionType from './actionTypes'

//Obtiene todas las provincias
const getAllProvince = (payload: any) =>({
    type: actionType.GET_ALL_PROVINCE,
    payload: {...payload}
})
//Obtiene todas los cantones de una provincia
const getCantonByProvice = (payload: any) =>({
    type: actionType.GET_CANTONS_BY_PROVINCE,
    payload: {...payload}
})
//Obtiene todas los distritos de un canton
const getDistrictsByCanton = (payload: any) => ({
    type: actionType.GET_DISTRICTS_BY_CANTON,
    payload: {...payload}
})
//Indicar que se espera respuesta de conexion
const loading =(payload: boolean) =>({
    type: actionType.LOADING,
    payload: payload
})
//Indica si hubo un fallo
const failure =(payload: boolean) =>({
    type: actionType.FALIURE,
    payload: payload
})

const clearCanton=()=>({
    type: actionType.CLEAR_CANTONS
})

const clearDistrict=()=>({
    type: actionType.CLEAR_DISTRICT
})

const signs = {
    getAllProvince: getAllProvince,
    getCantonByProvice: getCantonByProvice,
    getDistrictsByCanton: getDistrictsByCanton,
    clearCanton: clearCanton,
    clearDistrict: clearDistrict,
    loading: loading,
    failure: failure
}

export default signs