export function mutateToken(state, token) {
    state.token = token;
}

export function mutateErrorMessage(state, message) {
    state.errorMessage = message;
}

export function mutateRegistrationSuccess(state, success) {
    state.registrationSuccess = success
}