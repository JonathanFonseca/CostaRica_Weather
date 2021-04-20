import React, { useEffect, useState } from 'react';
import { RootStore } from './../../data/store'
import { useDispatch, useSelector } from 'react-redux';
import calls from './../../data/actions/location/calls';
import signs from './../../data/actions/location/signs';
import Dialog from './../../components/dialog'
import Select from './../../components/select'
import Weather from './../Weather/weatherContainer'
import { Box, Button } from '@material-ui/core';

type props={
  selectedPronvince: {key: string, name: string},//state Provincia seleccionada
  selectedCantons: {key: string, name: string},//state canton seleccionado
  selectedDistrict: {key: string, name: string},//state distrito seleccionado
  setSelectedPronvince: Function,//funcion cambiar state provincia
  setSelectedCantons: Function,//funcion cambiar state canton
  setSelectedDistrict: Function,//funcion cambiar state distrito
  addFavotire?: Function,//Funcon para agregar un favorito
  isLoadEdit: boolean,//bandera para saber si se quiere editar ubicacion
  showBottonClear: boolean,//bandera para saber si mostrar el boton de limpiar campos
  setLoadedEdit: Function,//funcion para cambiar la bandera de editar
}

function LocationContainer({selectedPronvince, setSelectedPronvince, selectedCantons, selectedDistrict,
  setSelectedCantons, setSelectedDistrict, addFavotire, isLoadEdit, setLoadedEdit, showBottonClear}: props) {
    const dispatch = useDispatch();
    const [selectedPronvinceTemporal, setSelectedPronvinceTemporal] = useState({ key: "", name: "" })
    const [selectedCantonsTemporal, setSelectedCantonsTemporal] = useState({ key: "", name: "" })
    const [selectedDistrictTemporal, setSelectedDistrictTemporal] = useState({ key: "", name: "" })
    const { provinces, cantons, districts } = useSelector((state: RootStore) => state.locationReducer)

    useEffect(() => {
      dispatch(calls.fetchProvince())
    },[])
    ///Metodo para limpiar todos los campos
    const clearAll=()=>{
      const clear={
        key:"",
        name:""
      }
      setSelectedPronvinceTemporal(clear)
      setSelectedCantonsTemporal(clear)
      setSelectedDistrictTemporal(clear)
      setSelectedPronvince(clear)
      setSelectedCantons(clear)
      setSelectedDistrict(clear)
      dispatch(signs.clearCanton())
      dispatch(signs.clearDistrict())
    }
    //Meteodo para traer los cantones cuadno se selecciona una provincia y carga la provincia seleccionada
    const changeProvince = () => {
      if (selectedPronvinceTemporal.key !== "Sin resultados" && selectedPronvinceTemporal.key !== "") {
        setSelectedPronvince(selectedPronvinceTemporal)
        dispatch(calls.fetchCantons(selectedPronvinceTemporal.key))
      }
    }
    ///Metodo para traer los distritos cuando se cambia un canton y carga el canton seleccionado
    const changeCanton = () => {
      if (selectedCantonsTemporal.key !== "Sin resultados" && selectedCantonsTemporal.key !== "") {
        setSelectedCantons(selectedCantonsTemporal)
        dispatch(calls.fetchDistricts(selectedPronvinceTemporal.key, selectedCantonsTemporal.key))
      }
    }
    //Metodo que carga el distrito seleccionado
    const changeDistrict = () => {
      if (selectedDistrictTemporal.key !== "Sin resultados" && selectedDistrictTemporal.key !== "")
        setSelectedDistrict(selectedDistrictTemporal)
    }
    //Metodo para cargar todos los datos de una ubicacion favorita que se desea editar
    const loadDataEdit = ()=>{
      if(isLoadEdit){
        setSelectedPronvinceTemporal({key: selectedPronvince.key, name: selectedPronvince.name})
        setSelectedCantonsTemporal({key: selectedCantons.key, name: selectedCantons.name})
        setSelectedDistrictTemporal({key: selectedDistrict.key, name: selectedDistrict.name})
        dispatch(calls.fetchCantons(selectedPronvince.key))
        dispatch(calls.fetchDistricts(selectedPronvince.key,selectedCantons.key))
        setLoadedEdit(false)
      }
    }
    return (
      <div>
        <h3>Ubicación</h3>
        <Dialog //Dialog para provincias
          titleButton={selectedPronvince.key !== "" ? `Provincia: ${selectedPronvince.name}` : "Seleccione una provincia"}
          dialogTitle="Provincias"
          okFunction={changeProvince}
          onLoadFunction={isLoadEdit ? loadDataEdit : undefined}
          isNameLocationSelected={selectedPronvince.name}
          buttonDisable={false}
          isShowWeather={false}
          >
          <Select
            data={provinces}
            placeholder={"Seleccione una"}
            valueSelected={selectedPronvinceTemporal.key}
            setChangeValue={setSelectedPronvinceTemporal}
          />
        </Dialog>
        <Dialog //Dialog para cantones
          titleButton={selectedCantons.key !== "" ? `Cantón: ${selectedCantons.name}` : "Seleccione un cantón"}
          dialogTitle="Cantón"
          okFunction={changeCanton}
          onLoadFunction={isLoadEdit ? loadDataEdit : undefined}
          isNameLocationSelected={selectedCantons.name}
          buttonDisable={false}
          isShowWeather={false}
        >
          <Select
            data={cantons}
            placeholder={"Seleccione una"}
            valueSelected={selectedCantonsTemporal.key}
            setChangeValue={setSelectedCantonsTemporal}
          />
        </Dialog>
        <Dialog //Dialog para distritos
          titleButton={selectedDistrict.key !== "" ? `Distrito: ${selectedDistrict.name}` : "Seleccione un distrito"}
          dialogTitle="Distritos"
          okFunction={changeDistrict}
          onLoadFunction={isLoadEdit ? loadDataEdit : undefined}
          isNameLocationSelected={selectedDistrict.name}
          buttonDisable={false}
          isShowWeather={false}
        >
          <Select
            data={districts}
            placeholder={"Seleccione una"}
            valueSelected={selectedDistrictTemporal.key}
            setChangeValue={setSelectedDistrictTemporal}
          />
        </Dialog>
        <Box>
          <Weather
            addFavorite={addFavotire}
            district={selectedDistrict.name}
            buttonDisable={selectedDistrict.name!=="" ? false : true}
          />
          {!showBottonClear &&
            <Button onClick={()=>clearAll()}>Limpiar</Button>
          }    
        </Box>
      </div>
    );
  }
  export default LocationContainer;
  