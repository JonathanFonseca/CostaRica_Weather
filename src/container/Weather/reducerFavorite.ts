import React from 'react'
import {site} from './interfeces'
interface DefaultState {
    favorite: site[]
}
//estado inicial
export const initialState: DefaultState = {
    favorite: []
}
//Reducer
export const reducer = (state: DefaultState = initialState, action: any) => {
    switch (action.type) {
        case "addFavorite":
            if (state.favorite.length < 3) {
                state.favorite.push(action.payload)
                return {
                    ...state,
                    favorite: state.favorite
                }
            }
            return { ...state }
        case "editFavorite":
            var newFavorite = state.favorite.map(x => {
                if (x.keySite === action.payload.keyToEdit) {
                    return action.payload.newFavorite
                }
                return x
            })
            return { ...state, favorite: newFavorite }
        case "deleteFavorite":
            var newFavoriteDelete: any[]= state.favorite.filter(x=> {
                if(x.keySite!== action.payload){
                    return x
                }
                return null
            }) 
            return { ...state, favorite: newFavoriteDelete }
        default:
            return { ...state }
    }
}
