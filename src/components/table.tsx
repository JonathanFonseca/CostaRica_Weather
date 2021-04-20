import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Weather from './../container/Weather/weatherContainer'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {yellow, red} from '@material-ui/core/colors'
import {site} from './../container/Weather/interfeces'
type props = {
    columns: string[], //Columnas de la tabla
    data: site[],//Datos a cargar
    setEditState?: Function,//Funcion para editar favoritos
    deleteFavorite?: Function,//Funcion para eliminar favoritos
}

function TableComponent({ columns, data, setEditState, deleteFavorite}: props) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(col => {
                            return (
                                <TableCell>{col}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length>0 && data.map(da => {
                        return (
                            <TableRow key={da.keySite}>
                                <TableCell>{da.province}</TableCell>
                                <TableCell>{da.canton}</TableCell>
                                <TableCell>{da.district}</TableCell>
                                <TableCell component={() =>
                                    <>
                                            <Weather 
                                                buttonIconOpen={true}
                                                district={da.district}
                                                buttonDisable={false}
                                            /> 
                                        {setEditState!==undefined && //Condicional para cargar boton de editar
                                            <EditIcon 
                                                onClick={()=>setEditState(da)}
                                                style={{color: yellow['A200']}}  
                                                  
                                            >
                                                    editar
                                            </EditIcon>}
                                        {deleteFavorite!== undefined && //Condicional para cargar boton de eliminar
                                            <DeleteIcon 
                                                onClick={()=>deleteFavorite(da)}
                                                style={{color: red['A200']}}
                                            >
                                                    Eliminar
                                            </DeleteIcon>}
                                        
                                    </>
                                } />
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent