<template>
  <div class="container">

    <div class="login-form">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="TelematiX" class="logo-image">
      </div>
      <label for="username" class="form-label">Username</label>
      <input type="text" class="form-control" id="username" v-model="username">

      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password">

      <pre v-if="loginFailed" class="text text-danger text-center ">{{loginFailed}}</pre>
      <div class="buttons-container">
        <button class="btn btn-primary" @click="onLoginClick()">
          Login
        </button>

        <button class="btn btn-secondary">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "LoginView",
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    ...mapActions({
      makeLogin: 'auth/makeLogin'
    }),
    onLoginClick() {
      this.makeLogin({
        username: this.username,
        password: this.password
      });
    }
  },
  computed: {
    ...mapGetters({
      loginFailed: 'auth/getErrorMessage',
    })
  }
}
</script>

<style scoped>
.form-label {
  margin-top: 10px;
  margin-bottom: 5px;
}
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    padding: 50px;
    border-radius: 10px;
  }

  .logo-container {
    margin: 0;
    padding: 0;
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;

  }

  .btn {
    margin-bottom: 5px;
    margin-top: 10px;
  }
</style>