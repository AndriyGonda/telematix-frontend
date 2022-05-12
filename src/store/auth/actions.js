import CONSTANTS from '../../../constants'
import axios from 'axios';

export function makeLogin(ctx, credentials) {
    axios.post(`${CONSTANTS.API_ROOT}/login`, credentials).then(response => {
        sessionStorage.setItem("token", response.data.token);
        window.location.href = '/';
    }).catch( reason => ctx.commit('mutateErrorMessage', reason.response.data.message));
}