import CONSTANTS from '../../../constants'
import axios from 'axios';

export function loadDevices(ctx) {
    axios.get(`${CONSTANTS.API_ROOT}/devices`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }).then(response => ctx.commit('mutateDevices', response.data)).catch(()=> ctx.commit('mutateDevices', []))
}

export function createDevice(ctx, payload) {
    return axios.post(`${CONSTANTS.API_ROOT}/devices`, payload,{
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
}

export function removeDevice(ctx, deviceId) {
    return axios.delete(`${CONSTANTS.API_ROOT}/device/${deviceId}`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
}

export function updateDevice(ctx, payload) {
    return axios.put(`${CONSTANTS.API_ROOT}/device/${payload.deviceId}`, {
        name: payload.name,
        gps: payload.gps
    }, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
}