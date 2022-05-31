<template>
<div>
  <nav-bar></nav-bar>
  <div class="profile-form">
    <div class="profile-form-container">
      <div class="avatar-update-container">
        <div v-if="avatar && avatar.length" class="avatar-container">
          <img :src="avatar" alt="">
        </div>
        <div v-else class="avatar-container">
          <div>Avatar is empty</div>
        </div>
        <div class="form-group">
          <input type="file" ref="file" @change="uploadFile" class="form-control" style="margin-bottom: 10px">
        </div>
        <div class="form-group">
          <button class="btn btn-danger" @click="submitFile">
            Update avatar
          </button>
          <pre v-if="uploaded" class="text text-success">{{ uploaded }}</pre>
        </div>
      </div>

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
import CONSTANTS from '../../constants'
import axios from "axios";
export default {
  name: "ProfileView",
  components: {NavBar},
  data() {
    return {
      firstName: null,
      lastName: null,
      avatar: null,
      images: null,
      uploaded: null
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
    },
    uploadFile() {
      this.images = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.images);
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '  + sessionStorage.getItem("token")
      };
      axios.post(`${CONSTANTS.API_ROOT}/profile/avatar`, formData, { headers }).then(() => {
        this.uploaded = "Avatar updated"
        this.$router.go(0);
      }).catch(reason => this.uploaded = reason.response.data);
    }
  },
  mounted() {
    this.loadProfileInfo().then(
        profile => {
          this.firstName = profile.data.firstName;
          this.lastName = profile.data.lastName;
          if (profile.data.avatarUrl) {
            this.avatar = CONSTANTS.API_ROOT + "/images/" + profile.data.avatarUrl;
          }

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
.avatar-container {
  width: 200px;
  height: 200px;
  border-radius: 50px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
img {
  max-width: 200px;
  border-radius: 50px;
}
.avatar-update-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
}
</style>