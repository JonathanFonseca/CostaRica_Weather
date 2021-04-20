import React from 'react'
import calls from './../../data/actions/weather/calls'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from './../../data/store'
import Dialog from './../../components/dialog'
import Box from '@material-ui/core/Box';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { yellow, grey, blue, red } from '@material-ui/core/colors'
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import CloudIcon from '@material-ui/icons/Cloud';
import SpeedIcon from '@material-ui/icons/Speed';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import { Button } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star';
type props = {
  addFavorite?: Function,// function para agregar favorito
  district?: string,//Nombre del distrito a buscar clima
  buttonIconOpen?: boolean, //Bandera para cargar icon como boton en el dialog
  buttonDisable: boolean// bandera para bloquear boton en el dialog
}
function WeatherContainer({ addFavorite, district, buttonIconOpen, buttonDisable }: props) {
  const dispatch = useDispatch()
  const { main, wind, loading, failure } = useSelector((state: RootStore) => state.weatherReducer)
 //Funcion para cargar clima al abrir dialog
  const onLoadFunction = () => {
    if (district !== undefined)
      dispatch(calls.fetchWeather(district))
  }
  return (
    <Dialog
      titleButton="Ver clima"
      dialogTitle="Clima"
      onLoadFunction={district !== "" ? onLoadFunction : undefined}
      buttonIconOpen={buttonIconOpen}
      buttonDisable={buttonDisable}
      isShowWeather={true}
    >
      <>
        {!failure ? //Validamos no haya error de carga o no exista la ciudad
          <>
            <Box className="content-weather-information">
              <WbSunnyIcon style={{ color: yellow['A200'] }} />
              <label><b>Temperatura:</b></label>
              {!loading ? <label className={main.temp>=73 ? "animationHot" : main.temp<=59 ? "animationCool": ""}><i> {main.temp}°F</i></label> : "cargando..."} 
            </Box>
            <Box className="content-weather-information">
              <SpeedIcon style={{ color: red['700'] }} />
              <label><b>Presión atmosferica:</b> {!loading ? <i>{main.pressure}hPa</i> : "cargando..."} </label>
            </Box>
            <Box className="content-weather-information">
              <InvertColorsIcon style={{ color: blue['A400'] }} />
              <label><b>Humedad:</b> {!loading ? <i>{main.humidity}%</i> : "cargando..."}</label>
            </Box>
            <Box className="content-weather-information">
              <CloudIcon style={{ color: grey[600] }} />
              <label><b>Viento:</b> {!loading ? <i>{wind}mph</i> : "cargando..."} </label>
            </Box>
            {addFavorite !== undefined &&//Condicional para boton de favorito
              <Button style={{backgroundColor: '#E1E1E1'}} endIcon={<StarIcon style={{color: 'yellow'}}/>} 
              onClick={() => addFavorite(0)}>Agregar favorito</Button>
            }
          </>
          :
          <Box className="content-weather-information">
            <CloudOffIcon fontSize='large' />
            <label style={{fontSize: '20px'}}>Ciudad no encontrada</label>
          </Box>
        }
      </>
    </Dialog>
  )
}

export default WeatherContainer