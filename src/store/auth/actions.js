import CONSTANTS from '../../../constants'
import axios from 'axios';
export function makeLogin(ctx, credentials) {
    axios.post(`${CONSTANTS.API_ROOT}/login`, credentials).then(response => {
        sessionStorage.setItem("token", response.data.token);
        ctx.commit('mutateErrorMessage', null)
        window.location.href = '/';
    }).catch( reason => {
        ctx.commit('mutateErrorMessage', reason.response.data.message)
        ctx.commit('mutateToken', null);
    });
}

export function makeRegistration(ctx, userData) {
    axios.post(`${CONSTANTS.API_ROOT}/register`, userData).then(() => {
        ctx.commit('mutateRegistrationSuccess', true)
        ctx.commit('mutateErrorMessage', null)
    }).catch(reason => {
        ctx.commit('mutateRegistrationSuccess', false)
        ctx.commit('mutateErrorMessage', reason.response.data.message);
    })
}


export function getProfileInfo() {
    return axios.get(`${CONSTANTS.API_ROOT}/profile`, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    });
}

export function updateUserProfile(ctx, payload) {
    axios.put(`${CONSTANTS.API_ROOT}/profile`, payload, {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    }).then(() => {
        ctx.commit('mutateProfileUpdated', true)
        ctx.commit('mutateProfileUpdateFailed', null);
    })
        .catch(reason => {
            ctx.commit('mutateProfileUpdateFailed', reason);
            ctx.commit('mutateProfileUpdated', false)
        })
}