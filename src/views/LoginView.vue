<template>
  <div class="container">

    <div class="login-form">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="TelematiX" class="logo-image">
      </div>
      <label for="username" class="form-label">Username</label>
      <input type="text" class="form-control" id="username">

      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password">
      <div class="buttons-container">
        <button class="btn btn-primary">
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
export default {
  name: "LoginView"
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    background: rgba(238, 238, 238, 0.94);
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