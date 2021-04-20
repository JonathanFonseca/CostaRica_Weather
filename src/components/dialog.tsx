import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {blue} from '@material-ui/core/colors'

type props={
    dialogTitle: string, //Titulo
    titleButton: string, //Titulo del boton que abre el dialog
    isNameLocationSelected?: string//Cambia la clase del boton si el parametro es vacio (los nombres de clase estan quemadas)
    okFunction?: Function,//Funcion que se ejecuta al presionar el boton de Ok
    children?: JSX.Element,//Hijos
    onLoadFunction?: Function,//Funcion que se ejecuta al abrir el dialog
    buttonIconOpen?: boolean,//Si se quiere un boton tipo icono para abrir el dialog
    buttonDisable: boolean,//Boton de abrir dialog esta bloqueda
    isShowWeather: boolean,//Sirve para distinguir que no sea un dialog para un select
}

export default function DialogSelect({titleButton, children, dialogTitle, okFunction, onLoadFunction, buttonIconOpen,
  isNameLocationSelected, buttonDisable, isShowWeather}: props) {
  const [open, setOpen] = React.useState(false);
  //Abre el dialog
  const handleClickOpen = () => {
    setOpen(true);
    if (onLoadFunction!==undefined) onLoadFunction() //Funcion ejecutar al abrir
  }
  //Cerrar dialog al presionar el boton de Ok
  const handleCloseOk = () => {
    setOpen(false);
    if (okFunction!==undefined) okFunction()//Funcion ejecutar al cerrar por Ok
  }

  //Cerrar dialog al presionar el boton de Cancel
  const handleCloseCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      {buttonIconOpen!== undefined ? //Muesta icono como boton de abrir 
        <VisibilityIcon style={{color: blue['A200']}} onClick={handleClickOpen}/>
        :
          isShowWeather && buttonDisable ? // Muestra boton de abrir bloqueado
            <Button endIcon={<VisibilityIcon/>} variant="contained" color='primary' disabled>{titleButton}</Button>
          :
            isShowWeather && !buttonDisable ? //Muestra boton de abrir 
              <Button endIcon={<VisibilityIcon/>} variant="contained" color='primary' onClick={handleClickOpen}>{titleButton}</Button>
            :
              buttonDisable!==true && //botones para abrir tipo select
                <Button variant="contained" className={isNameLocationSelected==="" ?"button_select" : "button_selected"} onClick={handleClickOpen}>{titleButton}</Button>  
            
        
    } 
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleCloseCancel}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}