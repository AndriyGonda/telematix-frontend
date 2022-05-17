<template>
<div class="layout">
 <nav-bar></nav-bar>
  <div class="top-panel">
    <button class="btn btn-primary" @click="onCreateDeviceShow"> Create device </button>
    <modal name="create-device-modal" class="modal-container">
      <div class="create-form">
        <h5 class="text text-primary">Create new device</h5>
        <label for="deviceName" class="text-label">Device name</label>
        <input type="text" id="deviceName" class="form-control" placeholder="New device" v-model="name">
        <div class="checkbox-container">
          <label for="deviceIsGPS" class="text-label">Mark as gps device</label>
          <input type="checkbox" class="md-checkbox" placeholder="GPS" v-model="gps">
        </div>
        <div class="modal-controls-container">
          <button class="btn btn-danger" @click="onCancelClick">
            Cancel
          </button>
          <button class="btn btn-success" @click="onCreateDeviceClick">
            Create
          </button>
        </div>
        <div v-if="errorMessage" class="text text-danger">{{errorMessage}}</div>
      </div>
    </modal>
  </div>
  <modal v-if="selectedDevice" name="edit-device-modal" class="modal-container">
    <div class="create-form">
      <h5 class="text text-primary">Edit device "{{selectedDevice.name}}"</h5>
      <label for="deviceName" class="text-label">Device name</label>
      <input type="text" id="deviceName" class="form-control" v-model="updateName">
      <div class="checkbox-container">
        <label for="deviceIsGPS" class="text-label">Mark as gps device</label>
        <input type="checkbox" class="md-checkbox" placeholder="GPS" v-model="updateGps">
      </div>
      <div class="modal-controls-container">
        <button class="btn btn-danger" @click="onUpdateModalCancelClick">
          Cancel
        </button>
        <button class="btn btn-success" @click="onUpdateClick">
          Update
        </button>
      </div>
      <div v-if="errorMessage" class="text text-danger">{{errorMessage}}</div>
    </div>
  </modal>

  <ul class="devices-list">
    <li class="md-list-item" v-for="device in devices" v-bind:key="device.id">
      <pre class="text text-success device-title">{{device.name}}</pre>
      <div class="btn-container">
        <button class="btn btn-primary btn-control" @click="onSensorsClick(device.id)">sensors</button>
        <button class="btn btn-success btn-control" @click="onUpdateModalShow(device)">edit</button>
        <button class="btn btn-danger btn-control" @click="onDeleteClick(device.id)">delete</button>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import NavBar from "@/components/Navbar";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DevicesView",
  components: {NavBar},
  data() {
    return {
      name: null,
      gps: null,
      errorMessage: null,
      updateName: null,
      updateGps: null,
      selectedDevice: null
    }
  },
  methods: {
    ...mapActions({
      loadDevices: 'device/loadDevices',
      createDevice: 'device/createDevice',
      deleteDevice: 'device/removeDevice',
      updateDevice: 'device/updateDevice'
    }),
    onCreateDeviceShow() {
      this.$modal.show("create-device-modal")
    },
    onCancelClick() {
      this.$modal.hide("create-device-modal")
    },
    onCreateDeviceClick() {
      this.createDevice({
        name: this.name,
        gps: this.gps
      }).then(() => {
        this.errorMessage = null
        this.loadDevices()
        this.$modal.hide("create-device-modal")
      }).catch(reason => this.errorMessage = reason.response.data.message)
    },
    onDeleteClick(deviceId) {
      this.deleteDevice(deviceId).then(() => this.loadDevices())
    },
    onUpdateModalShow(device) {
      this.selectedDevice = device
      this.updateName = this.selectedDevice.name
      this.updateGps = this.selectedDevice.gps
      this.$modal.show("edit-device-modal")
    },
    onSensorsClick(deviceId) {
      this.$router.push(`/device/${deviceId}/sensors`)
    },
    onUpdateModalCancelClick() {
      this.$modal.hide("edit-device-modal")
    },
    onUpdateClick() {
      this.updateDevice({
        deviceId: this.selectedDevice.id,
        name: this.updateName,
        gps: this.updateGps
      })
          .then(() => {
            this.errorMessage = null
            this.loadDevices()
            this.$modal.hide("edit-device-modal")
          })
          .catch(reason => this.errorMessage = reason.response.data.message)
    }
  },
  mounted() {
    this.loadDevices();
  },
  computed: {
    ...mapGetters({
      devices: "device/getDevices"
    })
  }
}
</script>

<style scoped>
.top-panel {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: #eee;
  padding: 10px;
}
.create-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.text-label {
  text-align: left;
  width: 100%;
}
.checkbox-container {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  margin-top: 10px;
}
.md-checkbox {
  margin-right: 10px;
}
.modal-controls-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 20px;
}
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 200px;
}
ul {
  margin-top: 10px;
}
li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  min-height: 20px;
  background: #eee;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}
pre {
  margin: 0;
  padding: 0;
}
.btn-control {
  margin-right: 10px;
}
.device-title {
  font-size: 16px;
  margin-left: 10px;
}
</style>