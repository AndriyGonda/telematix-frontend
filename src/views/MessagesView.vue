<template>
  <div class="layout">
    <nav-bar></nav-bar>
    <div class="panels-container">
      <div class="left-panel">
        <div class="period-form">
          <div class="form-item">
            <p class="text text-primary period-title">Select messages</p>
          </div>
          <div class="form-item">
            <label class="text text-left text-small">device</label>
            <v-select :options="selectDevices" :clearable="false" v-model="selectedDevice" :value="selectedDevice" @input="onSelectChange"></v-select>
          </div>
          <div class="form-item">
            <label class="text text-left text-small">sensor</label>
            <v-select :options="selectSensors" :clearable="false" v-model="selectedSensor" :value="selectedSensor"></v-select>
          </div>
          <div class="form-item">
            <p class="text text-primary period-title">Messages period</p>
          </div>
          <div class="form-item">
            <label class="text text-left text-small">from</label>
            <date-picker v-model="dateFrom" type="datetime"></date-picker>
          </div>
          <div class="form-item">
            <label class="text text-left text-small">to</label>
            <date-picker v-model="dateTo" type="datetime" class="form-input"></date-picker>
          </div>
          <div class="form-item">
            <button class="btn btn-success" @click="onLoadMessagesClick">Load messages</button>
          </div>
          <div class="form-item">
            <button class="btn btn-secondary">Clear</button>
          </div>
          <div v-if="errorMessage" class="text text-danger">{{errorMessage}}</div>
        </div>
      </div>
      <div class="right-panel">
        <div class="bottom-right-panel">
          <Vuetable ref="vuetable"
                    :fields="fields"
                    :api-mode="false"
                    :data="selectMessages"
          ></Vuetable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
import DatePicker from 'vue2-datepicker';
import Vuetable from 'vuetable-2'
import 'vue2-datepicker/index.css';
import {mapActions, mapGetters} from "vuex";
export default {
  name: "MessagesView",
  components: {NavBar, DatePicker,  Vuetable},
  data() {
    return {
      errorMessage: null,
      selectedDevice: null,
      selectedSensor: null,
      dateFrom: Date.now(),
      dateTo: Date.now(),
      fields: ["#", 'time', 'message'],
      data: [
        {
          id: 1,
          time: 'test',
          message: 'message'
        }
      ]
    };
  },
  methods: {
    ...mapActions({
      loadMessages: "device/loadMessages",
      loadDevices: "device/loadDevices",
      loadSensors: "device/loadSensors"
    }),
    onLoadMessagesClick() {
      this.errorMessage = null
      if (!this.dateFrom && !this.dateTo) {
        this.errorMessage = "Choose correct dates"
        return
      }
      if (this.dateFrom > this.dateTo) {
        this.errorMessage = "Date from greater than date to"
        return
      }
      if (!this.selectedDevice && !this.selectedSensor) {
        this.errorMessage = "No device or sensor selected"
        return;
      }
      this.loadMessages({
        deviceId: this.selectedDevice.id,
        sensorId: this.selectedSensor.id,
        dateFrom: this.dateFrom.toISOString().replace('Z', '00'),
        dateTo: this.dateTo.toISOString().replace('Z', '00')
      })
    },
    onSelectChange(device) {
      this.loadSensors(device.id)
    }
  },
  mounted() {
    this.loadDevices();
  },
  computed: {
    ...mapGetters({
      devices: 'device/getDevices',
      sensors: 'device/getSensors',
      messages: 'device/getMessages'
    }),
    selectDevices() {
      return this.devices.map(device=> {
        let obj = device;
        obj.label = device.name;
        return obj
      })
    },
    selectSensors() {
      return this.sensors.map(sensor => {
        let obj = sensor;
        obj.label = sensor.title;
        return obj
      })
    },
    selectMessages() {
      return this.messages.map((message, index) => {
        return {
          '#': index + 1 ,
          time: new Date(message.timestamp).toJSON(),
          message: message.raw
        }
      })
    }
  }
}
</script>

<style scoped>
.panels-container {
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 90vh;
}

.left-panel {
  height: 100%;
  margin: 10px;
  box-shadow: -5px 0px 0px 0px #fff, 5px 0px 0px 0px #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.right-panel {
  height: 100%;
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.top-right-panel {
  background: #eee;
  width: 100%;
  height: 60vh;
}
.form-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
}

.text-small {
  font-size: 12px;
}
.period-title {
  margin: 0;
}
.bottom-right-panel {
  width: 100%;
}
</style>