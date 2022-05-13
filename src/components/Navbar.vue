<template>
<nav>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
  </nav>
</nav>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style scoped>
.logo-image {
  zoom: 30%;
}
.navbar-brand {
  margin-left: 30px;
}
</style>