import CONSTANTS from '../../../constants'
import axios from 'axios';

export function loadDevices(ctx) {
    axios.get(`${CONSTANTS.API_ROOT}/devices`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }).then(response => ctx.commit('mutateDevices', response.data))
}