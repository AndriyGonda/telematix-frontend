export function getErrorMessage(state) {
    return state.errorMessage;
}

export function getSessionToken() {
    return sessionStorage.getItem("token")
}