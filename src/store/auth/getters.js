export function getErrorMessage(state) {
    return state.errorMessage;
}

export function getSessionToken() {
    return sessionStorage.getItem("token");
}

export function getRegistrationSuccess(state) {
    return state.registrationSuccess;
}