import signs from './signs'
import api from '../../../api/api'
import {Dispatch} from 'redux'

//Obtiene todas las provincias
const fetchProvince = ()=> async (dispatch: Dispatch) =>{
    await api.apiLocation.get("provincias.json")
    .then(response =>{
        dispatch(signs.loading(true))
        if(response.status===200){
            dispatch(signs.getAllProvince(response.data))
        }else{ //en caso de fallo al conectar con el api
            dispatch(signs.failure(true)) 
        }
        dispatch(signs.loading(false))
    }).catch(error=>{
        dispatch(signs.failure(true))
    })
}
//Obtiene todas los cantones de una provincia
const fetchCantons =(provinceKey: string) => async (dispatch: Dispatch) =>{
    await api.apiLocation.get(`provincia/${provinceKey}/cantones.json`)
    .then(response =>{
        dispatch(signs.loading(true))
        if(response.status===200){//en caso de fallo al conectar con el api
            dispatch(signs.getCantonByProvice(response.data))
        }else{
            dispatch(signs.failure(true))
        }
        dispatch(signs.loading(false))
    }).catch(error=>{
        dispatch(signs.failure(true))
    })
}
//Obtiene todas los distritos de un canton
const fetchDistricts =(provinceKey: string ,cantonKey: string) => async (dispatch: Dispatch) =>{
    await api.apiLocation.get(`provincia/${provinceKey}/canton/${cantonKey}/distritos.json`)
    .then(response =>{
        dispatch(signs.loading(true))
        if(response.status===200){
            dispatch(signs.getDistrictsByCanton(response.data))
        }else{//en caso de fallo al conectar con el api
            dispatch(signs.failure(true))
        }
        dispatch(signs.loading(false))
    }).catch(error=>{
        dispatch(signs.failure(true))
    })
    
}


const calls={
    fetchProvince: fetchProvince,
    fetchCantons: fetchCantons,
    fetchDistricts: fetchDistricts
}

export default calls

