<template>
<nav>
  <nav class="navbar navbar-expand-lg navbar-light bg-light  justify-content-between">
    <a class="navbar-brand" href="#">
      <img src="../assets/logo.png" alt="TelematiX" class="logo-image">
    </a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="/devices">Devices</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/monitoring">Monitoring</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/messages">Messages</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/reports">Reports</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile">Profile</a>
      </li>
    </ul>
    <form class="form-inline user-form">
      <b class="text text-secondary">{{username}}</b>
      <button class="btn btn-outline-success my-2 my-sm-0" @click="onLogout">Logout</button>
    </form>
  </nav>

</nav>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'nav-bar',
  methods: {
    ...mapActions({
      loadProfile: "auth/getProfileInfo"
    }),
    onLogout() {
      sessionStorage.removeItem('token')
    }
  },
  data() {
    return {
      username: null
    }
  } ,
  mounted() {
    this.loadProfile().then(response => this.username = response.data.username).catch(()=>this.$router.push('/login'))
  }
}
</script>

<style scoped>
.logo-image {
  zoom: 30%;
}
.navbar-brand {
  margin-left: 30px;
}
.user-form {
  margin-left: 30px;
  margin-right: 10px;
  min-width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>