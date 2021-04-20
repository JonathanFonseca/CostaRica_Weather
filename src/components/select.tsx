import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type props = {
    data?: any, //datos a cargar en el select
    setChangeValue?: Function,//Funcion para pasar valores al padre
    valueSelected?: string, //Valor seleccionado si existe 
    placeholder: string,
    
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
    }),
);

export default function DialogSelect({ data, setChangeValue, valueSelected, placeholder }: props) {
    const classes = useStyles();
    //Evento al cambiar de valor el select
    const handleChange = (event: React.ChangeEvent< { value: unknown } >) => {
        if(setChangeValue!==undefined) {//Pasar valor al padre
            setChangeValue(
                {key: event.target.value, 
                name: data.values[Number(event.target.value)]
            });
        }  
    }
    return (
        <div>
            <form className={classes.container}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="demo-dialog-native">{placeholder}</InputLabel>
                    <Select
                        native
                        value={valueSelected}
                        onChange={handleChange}
                        input={<Input id="demo-dialog-native" />}
                    >
                        {data.keys.length>0 &&
                            <option aria-label="None" value="" />
                        }
                        {data.keys.length >0 ? //Se comprueba existan datos
                            data.keys.map((d:any) =>{
                                return(
                                    <option key={d} value={d}>{data.values[d]}</option>
                                )
                            }) : <option>Sin resultados</option>}
                    </Select>
                </FormControl>
            </form>
        </div>
    );
}