<template>
<div class="layout">
 <nav-bar></nav-bar>
  <div class="top-panel">
    <button class="btn btn-primary" @click="onCreateDeviceShow"> Create device </button>
    <modal name="create-device-modal" class="modal-container">
      <div class="create-form">
        <h5 class="text text-primary">Create new device</h5>
        <label for="deviceName" class="text-label">Device name</label>
        <input type="text" id="deviceName" class="form-control" placeholder="New device">
        <div class="checkbox-container">
          <label for="deviceIsGPS" class="text-label">Mark as gps device</label>
          <input type="checkbox" class="md-checkbox" placeholder="GPS">
        </div>
        <div class="modal-controls-container">
          <button class="btn btn-danger" @click="onCancelClick">
            Cancel
          </button>
          <button class="btn btn-success">
            Create
          </button>
        </div>
      </div>
    </modal>
  </div>
  <ul class="devices-list">
    <li class="md-list-item" v-for="device in devices" v-bind:key="device.id">
      <pre class="text text-success device-title">{{device.name}}</pre>
      <div class="btn-container">
        <button class="btn btn-primary btn-control">info</button>
        <button class="btn btn-success btn-control">edit</button>
        <button class="btn btn-danger btn-control">delete</button>
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
  methods: {
    ...mapActions({
      loadDevices: 'device/loadDevices'
    }),
    onCreateDeviceShow() {
      this.$modal.show("create-device-modal")
    },
    onCancelClick() {
      this.$modal.hide("create-device-modal")
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