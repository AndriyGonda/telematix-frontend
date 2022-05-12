<template>
<div class="container">
  <div class="logo-container">
    <img src="../assets/logo.png" alt="TelematiX" class="logo-image">
  </div>
  <h1 class="text text-danger">Registration</h1>
  <pre v-if="!registrationSuccess" class="text text-secondary">Enter user data for registration</pre>
  <div v-if="!registrationSuccess"  class="registration-form container">
    <label for="username" class="form-label">Username</label>
    <input type="text" class="form-control" id="username" v-model="username">

    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" v-model="email">

    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" v-model="password">
    <pre v-if="registrationFailed" class="text text-danger text-center ">{{registrationFailed}}</pre>
    <button class="btn btn-danger" @click="onRegisterClick()">Register now</button>
  </div>
  <div v-else class="container">
    <pre class="text text-success">User registered. Please go to login page</pre>
    <button class="btn btn-primary" @click="()=> this.$router.push('/login')">Go to login</button>
  </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RegisterView",
  data () {
    return {
      username: null,
      email: null,
      password: null
    }
  },
  computed: {
    ...mapGetters({
      registrationFailed: "auth/getErrorMessage",
      registrationSuccess: "auth/getRegistrationSuccess"
    })
  },
  methods: {
    ...mapActions({
      makeRegister: 'auth/makeRegistration',

    }),
    onRegisterClick() {
      this.makeRegister({
        username: this.username,
        email: this.email,
        password: this.password
      });
    }
  }
}
</script>

<style scoped>
.logo-image {
  padding-bottom: 50px;
}
h1 {
  text-align: center;
}
pre {
  text-align: center;
}
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  margin-top: 15px;
  width: 100%;
}

.form-label {
  margin-top: 10px;
  margin-bottom: 5px;
}
</style>