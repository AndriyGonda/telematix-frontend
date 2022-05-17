export function mutateDevices(state, devices) {
    state.devices = devices
}

export function mutateDeviceCreation(state, isCreated) {
    state.deviceCreated = isCreated;
}

export function mutateDeviceCreationFailed(state, failed) {
    state.failedToCreateDevice = failed
}

export function mutateSelectedDeviceSensors(state, sensors) {
    state.selectedDeviceSensors = sensors
}

export function mutateSensorMessages(state, messages) {
    state.sensorMessages = messages
}