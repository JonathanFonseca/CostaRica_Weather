import actions from './../actions'

export interface DefaultState{
    provinces: {},
    cantons: string[],
    districts: string[]
}

const location = actions.location
const initialState: DefaultState ={
    provinces: {},
    cantons: [],
    districts:  []
}

const locationReducer =(state: DefaultState =  initialState, action: any)=>{
    switch(action.type){
        case location.actionTypes.GET_ALL_PROVINCE:
            return location.actions.getProvince(state, action.payload)
        case location.actionTypes.GET_CANTONS_BY_PROVINCE:
            return location.actions.getCantonsByProvince(state, action.payload)
        case location.actionTypes.GET_DISTRICTS_BY_CANTON:
            return location.actions.getDistrictsByCanton(state, action.payload)
        case location.actionTypes.CLEAR_CANTONS:
            return{
                ...state,
                cantons: []
            }
        case location.actionTypes.CLEAR_DISTRICT:
            return{
                ...state,
                districts: []
            }
        default:
            return {
                ...state
            }
    }
}

export default locationReducer;