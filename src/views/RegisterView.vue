<template>
<div class="container">
  <div class="logo-container">
    <img src="../assets/logo.png" alt="TelematiX" class="logo-image">
  </div>
  <h1 class="text text-danger">Registration</h1>
  <pre class="text text-secondary">Enter user data for registration</pre>
  <div class="registration-form container">
    <label for="username" class="form-label">Username</label>
    <input type="text" class="form-control" id="username">

    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email">

    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password">

    <button class="btn btn-danger">Register now</button>
  </div>
</div>
</template>

<script>
export default {
  name: "RegisterView"
}
</script>

<style scoped>
.logo-image {
  padding-bottom: 50px;
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
</style>