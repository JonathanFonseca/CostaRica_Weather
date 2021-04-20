import axios from 'axios'

const api= axios.create({
    baseURL: 'https://ubicaciones.paginasweb.cr/'
})

export default api;