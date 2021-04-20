import React, { useReducer, useState } from 'react'
import Header from './../../components/header'
import Location from './LocationContainer'
import Favorite from './favoriteWeatherContainer'
import { Box, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {reducer, initialState} from './reducerFavorite'
import {site} from './interfeces'

function MainContainer() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [provinceSelected, setProvinceSelected] = useState({ key: "", name: "" })
    const [cantonSelected, setCantonSelected] = useState({ key: "", name: "" })
    const [districtSelected, setDistrictSelected] = useState({ key: "", name: "" })
    const [editFavorite, setEditFavorite] = useState(false)
    const [isLoadedFavoriteLocation, setIsLoadedFavoriteLocation] = useState(false)
    const [keyBeforeToActionFavotire, setKeyBeforeToActionFavotire] = useState("")//Almacena la key de un favorito a editar o eliminar
    const addEditFavorite = (action: number) => { //0 para agregar favorito, 1 para editarFavorito
        if (provinceSelected.key !== "" &&
            cantonSelected.key !== "" &&
            districtSelected.key !== "") {
            //Se construye objeto a editar
            const favoriteToAddEdit: site = {
                keySite: `${provinceSelected.key},${cantonSelected.key},${districtSelected.key}`,
                province: provinceSelected.name,
                canton: cantonSelected.name,
                district: districtSelected.name
            }
            if (action === 0)
                dispatch({ type: "addFavorite", payload: favoriteToAddEdit })
            else if (action === 1) {
                dispatch({ type: "editFavorite", payload: { keyToEdit: keyBeforeToActionFavotire, newFavorite: favoriteToAddEdit } })
                setEditFavorite(false)
            }
        }
    }
    //Funcion para cancelar la edicion
    const cancelAction = () => {
        setEditFavorite(false)
    }
    //Funcion que carga los datos de ubicacion
    const loadDataEdit = (data: site) => {
        var keys = data.keySite.split(",")//Obtenemos las keys para construir objetos
        setProvinceSelected({ key: keys[0], name: data.province })
        setCantonSelected({ key: keys[1], name: data.canton })
        setDistrictSelected({ key: keys[2], name: data.district })
        setEditFavorite(true)
        setIsLoadedFavoriteLocation(true)
        setKeyBeforeToActionFavotire(data.keySite)
    }
    //Funcion para eliminar un favorito
    const deleteFavorite=(data: site)=>{
        if(window.confirm("¿Desea eliminar de favoritos?")){
            setKeyBeforeToActionFavotire(data.keySite)
            dispatch({type: "deleteFavorite", payload: data.keySite})
        }
      }
    return (
        <>
            <Header
                titleHeader="Clima Costa Rica"
            />
            <div className="container">
                <div className='container-child'>
                    <Location
                        selectedPronvince={provinceSelected}
                        setSelectedPronvince={setProvinceSelected}
                        selectedCantons={cantonSelected}
                        setSelectedCantons={setCantonSelected}
                        selectedDistrict={districtSelected}
                        setSelectedDistrict={setDistrictSelected}
                        addFavotire={!editFavorite ? addEditFavorite : undefined}
                        isLoadEdit={isLoadedFavoriteLocation}
                        setLoadedEdit={setIsLoadedFavoriteLocation}
                        showBottonClear={editFavorite}
                    />
                    {editFavorite &&//condicional para mostrar botones de editar
                        <Box>
                            <Button endIcon={<SaveIcon style={{color: 'blue'}}/>} onClick={() => addEditFavorite(1)}>Guardar</Button>
                            <Button endIcon={<CancelIcon style={{color: 'red'}}/>} onClick={cancelAction}>Cancelar</Button>
                        </Box>

                    }
                </div>
                <div className='container-child'>
                    {!editFavorite && //oculta seccion de favorito en caso de que se este en modo edicion
                        <Favorite
                            dataTable={state.favorite}
                            setEditState={loadDataEdit}
                            deleteFavorite={deleteFavorite}
                        />
                    }
                </div>
            </div>
        </>
    )
}
export default MainContainer