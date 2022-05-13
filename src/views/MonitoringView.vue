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
            <v-select></v-select>
          </div>
          <div class="form-item">
            <label class="text text-left text-small">sensor</label>
            <v-select></v-select>
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
            <button class="btn btn-success">Load messages</button>
          </div>
          <div class="form-item">
            <button class="btn btn-secondary">Clear</button>
          </div>
        </div>
      </div>
      <div class="right-panel">
        <div class="top-right-panel">
          <l-map  :zoom="8" :center="center">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
          </l-map>
        </div>
        <div class="bottom-right-panel">
          <Vuetable ref="vuetable"
                    :fields="['#', 'time', 'message']"
                    :api-mode="false"
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
import { latLng } from "leaflet";
export default {
  name: "MonitoringView",
  components: {NavBar, DatePicker,  Vuetable},
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      center: latLng(47.41322, -1.219482)
    };
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