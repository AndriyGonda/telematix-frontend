export function mutateDevices(state, devices) {
    state.devices = devices
}

export function mutateDeviceCreation(state, isCreated) {
    state.deviceCreated = isCreated;
}

export function mutateDeviceCreationFailed(state, failed) {
    state.failedToCreateDevice = failed
}