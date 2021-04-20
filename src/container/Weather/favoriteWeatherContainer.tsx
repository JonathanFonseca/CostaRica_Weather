import Table from './../../components/table'
import {site} from './interfeces'
type props = {
    dataTable: site[], //Datos a cargar en la tabla
    setEditState?: Function,//Funcion para editar favoritos
    deleteFavorite?: Function,//Funcion para eliminar favoritos
}


function FavoriteWeather({ dataTable, setEditState, deleteFavorite }: props) {
    //Columnas de la tabla
    const colums = [
        "Provincia", "Cantón", "Distrito"
    ]
    return (
        <div style={{height: "100%" ,overflowX: 'auto'}}>
            <h3>Favoritos</h3>
            <Table
                columns={colums}
                data={dataTable}
                setEditState={setEditState !== undefined ? setEditState : undefined}
                deleteFavorite={deleteFavorite !== undefined ? deleteFavorite : undefined}
            />
        </div>
    )
}

export default FavoriteWeather