<template>
  <div class="layout">
    <nav-bar></nav-bar>
    <div class="top-panel">
      <button class="btn btn-primary" @click="onAddSensorClick"> Add sensor</button>
      <modal name="create-sensor-modal" class="modal-container"
             :width="300"
             :height="390"
             :adaptive="true">
        <div class="create-form">
          <h5 class="text text-primary">Add new sensor</h5>
          <label for="sensorTitle" class="text-label">Sensor title</label>
          <input type="text" id="sensorTitle" class="form-control" placeholder="New sensor" v-model="createTitle">
          <label for="sensorTopic" class="text-label">Topic</label>
          <input type="text" id="sensorTopic" class="form-control" placeholder="Sensor topic" v-model="createTopic">
          <label for="sensorType" class="text-label">Sensor type</label>
          <v-select :options="['STRING', 'NUMBER', 'GPS_JSON']" v-model="sensorType" :value="sensorType" class="form-control"></v-select>
          <button class="btn btn-success modal-btn"  @click="onSaveClick">Save</button>
          <button class="btn btn-danger modal-btn" @click="onCreateDismissClick">Dismiss</button>
          <div v-if="errorMessage" class="text text-danger">{{errorMessage}}</div>
        </div>
      </modal>
    </div>
    <modal name="edit-sensor-modal" class="modal-container"
           :width="300"
           :height="390"
           :adaptive="true">
      <div class="create-form">
        <h5 class="text text-primary">Edit sensor</h5>
        <label for="sensorTitle" class="text-label">Sensor title</label>
        <input type="text" id="sensorTitle" class="form-control" placeholder="New sensor" v-model="updateTitle">
        <label for="sensorTopic" class="text-label">Topic</label>
        <input type="text" id="sensorTopic" class="form-control" placeholder="Sensor topic" v-model="updateTopic">
        <label for="sensorType" class="text-label">Sensor type</label>
        <v-select :options="['STRING', 'NUMBER', 'GPS_JSON']" v-model="updateSensorType" :value="updateSensorType" class="form-control"></v-select>
        <button class="btn btn-success modal-btn" @click="onUpdateClick">Update</button>
        <button class="btn btn-danger modal-btn" @click="onUpdateDismissClick">Dismiss</button>
        <div v-if="errorMessage" class="text text-danger">{{errorMessage}}</div>
      </div>
    </modal>

    <ul class="sensors-list">
      <li class="md-list-item" v-for="sensor in sensors" v-bind:key="sensor.id">
        <pre class="text text-success sensor-title">{{sensor.title}} [type: {{sensor.sensorType}}]</pre>
        <pre class="text text-danger sensor-title">Topic: {{sensor.topic}}</pre>
        <div class="btn-container">
          <button class="btn btn-success btn-control" @click="onUpdateSensorShow(sensor)">edit</button>
          <button class="btn btn-danger btn-control" @click="onDeleteClick(sensor.id)">delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar'
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SensorsView",
  components: {NavBar},
  data() {
    return {
      createTitle: null,
      createTopic: null,
      sensorType: 'STRING',
      updateTitle: null,
      updateTopic: null,
      updateSensorType: null,
      selectedSensor: null,
      errorMessage: null,
      deviceId: this.$route.params.id
    }
  },
  methods: {
    ...mapActions({
      loadSensors: 'device/loadSensors',
      getLatestValue: 'device/getLatestSensorValue',
      updateSensor: 'device/updateSensor',
      addSensor: 'device/addNewSensor',
      deleteSensor: 'device/deleteSensor'
    }),
    onAddSensorClick() {
      this.$modal.show('create-sensor-modal')
    },
    onCreateDismissClick() {
      this.$modal.hide('create-sensor-modal')
    },

    onUpdateDismissClick() {
      this.$modal.hide('edit-sensor-modal')
    },
    onSaveClick() {
      this.addSensor({
        deviceId: this.deviceId,
        title: this.createTitle,
        topic: this.createTopic,
        sensorType: this.sensorType
      }).then(() => {
        this.errorMessage = null
        this.loadSensors(this.deviceId);
        this.$modal.hide('create-sensor-modal')
      }).catch(reason => this.errorMessage = reason.response.data.message)
    },
    onDeleteClick(sensorId) {
      this.deleteSensor({
        deviceId: this.deviceId,
        sensorId:  sensorId
      }).then(() => this.loadSensors(this.deviceId))
    },
    onUpdateSensorShow(sensor) {
      this.selectedSensor = sensor;
      this.updateTopic = sensor.topic;
      this.updateSensorType = sensor.sensorType;
      this.updateTitle = sensor.title;
      this.$modal.show('edit-sensor-modal')
    },
    onUpdateClick() {
      this.updateSensor({
        deviceId: this.deviceId,
        sensorId: this.selectedSensor.id,
        topic: this.updateTopic,
        sensorType: this.updateSensorType,
        title: this.updateTitle
      }).then(() => {
        this.$modal.hide('edit-sensor-modal')
        this.errorMessage = null
      }).catch(reason => this.errorMessage = reason.response.data.message)
    }
  },
  mounted() {
    this.loadSensors(this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      sensors: 'device/getSensors'
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
.sensor-title {
  font-size: 16px;
  margin-left: 10px;
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
.modal-btn {
  margin-top: 10px;
  width: 100%;
}
</style>