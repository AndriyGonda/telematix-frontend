<template>
<div>
  <nav-bar></nav-bar>
  <div class="profile-form">
    <div class="profile-form-container">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" class="form-control" v-model="firstName">
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" class="form-control" v-model="lastName">
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-danger" @click="onUpdateClick">
        Update profile info
      </button>
      <pre v-if="profileUpdated" class="text text-success">Profile Updated</pre>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from '@/components/Navbar'
import {mapActions, mapGetters} from "vuex";
export default {
  name: "ProfileView",
  components: {NavBar},
  data() {
    return {
      firstName: null,
      lastName: null
    }
  },
  methods: {
    ...mapActions({
      loadProfileInfo: 'auth/getProfileInfo',
      updateProfile: 'auth/updateUserProfile'
    }),
    onUpdateClick() {
      this.updateProfile({
        firstName: this.firstName,
        lastName: this.lastName
      })
    }
  },
  mounted() {
    this.loadProfileInfo().then(
        profile => {
          this.firstName = profile.data.firstName;
          this.lastName = profile.data.lastName;
        }
    ).catch(() => this.$router.push('/login'));
  },
  computed: {
    ...mapGetters({
      profileUpdated: "auth/getProfileUpdated",
      failedToUpdateError: "auth/getProfileUpdateFailed"
    })
  }
}
</script>

<style scoped>
.profile-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.profile-form-container {
  padding: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.text-success {
  margin-top: 10px;
}
</style>