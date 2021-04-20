import actions from './../actions'

const actionTypes = actions.weather

export interface DefaultState{
    main:{}
    wind: string,
    loading: boolean,
    failure: boolean

}

const initialState: DefaultState={
    main:{},
    wind:"",
    loading: true,
    failure: false
}


const weatherReducer = (state: DefaultState = initialState, action: any)=>{
    switch(action.type){
        case actionTypes.actionTypes.GET_WEATHER:
            return actionTypes.actions.getWeather(state, action.payload)
        case actionTypes.actionTypes.LOADING:
            return actionTypes.actions.loading(state, action.payload)
        case actionTypes.actionTypes.FAILURE:
            return actionTypes.actions.failure(state, action.payload)
        default:
            return{
                ...state
            }
    }
}

export default weatherReducer