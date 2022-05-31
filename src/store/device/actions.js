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

export function loadSensors(ctx, deviceId) {
    axios.get(`${CONSTANTS.API_ROOT}/device/${deviceId}/sensors`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }).then(response => ctx.commit('mutateSelectedDeviceSensors', response.data))
        .catch(() => ctx.commit('mutateSelectedDeviceSensors', []))
}


export function getLatestSensorValue(ctx, payload) {
    return axios.get(`${CONSTANTS.API_ROOT}/device/${payload.deviceId}/sensor/${payload.sensorId}/value`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    });
}

export function addNewSensor(ctx, payload) {
    return axios.post(`${CONSTANTS.API_ROOT}/device/${payload.deviceId}/sensors`, {
        topic: payload.topic,
        title: payload.title,
        sensorType: payload.sensorType
    },
        {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
}

export function updateSensor(ctx, payload) {
    return axios.put(`${CONSTANTS.API_ROOT}/device/${payload.deviceId}/sensor/${payload.sensorId}`, {
        topic: payload.topic,
        title: payload.title,
        sensorType: payload.sensorType
    },
        {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
}

export function deleteSensor(ctx, payload) {
    return axios.delete(`${CONSTANTS.API_ROOT}/device/${payload.deviceId}/sensor/${payload.sensorId}`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })
}

export function loadMessages(ctx, payload) {
    axios.get(`${CONSTANTS.API_ROOT}/device/${payload.deviceId}/sensor/${payload.sensorId}/interval`, {
        params: {
            dateFrom: payload.dateFrom,
            dateTo: payload.dateTo
        },
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }).then(response => ctx.commit('mutateSensorMessages', response.data))
        .catch(() => ctx.commit('mutateSensorMessages', []))
}

export function downloadMessages(ctx, payload) {
    axios.get(`${CONSTANTS.API_ROOT}/device/${payload.deviceId}/sensor/${payload.sensorId}/interval/csv`, {
        params: {
            dateFrom: payload.dateFrom,
            dateTo: payload.dateTo
        },
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'messages.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
    })
        .catch(() => {})
}

export function loadNumberReport(ctx, payload) {
    axios.get(`${CONSTANTS.API_ROOT}/device/${payload.deviceId}/sensor/${payload.sensorId}/report/number`, {
        params: {
            dateFrom: payload.dateFrom,
            dateTo: payload.dateTo
        },
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }).then(response => {
        ctx.commit('mutateNumberReport', response.data)
        console.log(response.data)
    })
        .catch(() => {
            ctx.commit('mutateNumberReport', null)
        })
}