<template>
  <div class="change">
    <form @submit="submitForm">
    <label>Change Username</label>
    <input type="text" name="useruid" v-model="useruid">
    <label>Change Password</label>
    <input type="password" placeholder="Change Password" name="password" v-model="password">
    <button>Change</button>
    </form>
  </div>
</template>

<script>
import API from '../Api'
export default {
  data() {
    return {
      useruid: '',
      password: '',
      id: this.$route.params.id
    }
  },
  methods: {
    async submitForm() {
      this.$router.push({ name: 'Master', params: { id: this.id, message: `Admin with the username: ${this.useruid} has been updated!` } })
			await API.updateAdmin(this.id, { useruid: this.useruid, password: this.password })
    }
  },
  async created() {
    if(!localStorage.authenticated) {
      this.$router.push({ name: 'Login' })
    }
    await API.getAdminById(this.id)
    .then((data) => this.useruid = data.useruid)
    .catch(err => console.log(err))
  }
}
</script>

<style scoped>
.change form {
max-width: 400px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
}
.change input {
display: block;
margin: 30px auto;
font-size: 0.9em;
font-weight: bold;
letter-spacing: 1px;
border: none;
outline: none;
width: 100%;
padding-bottom: 10px;
border-bottom: 1px solid gainsboro;
text-transform: capitalize;
}
.change form label {
  color: #aaa;
  display: inline-block;
  font-size: 0.6em;
  position: relative;
  top: 14px;
  left: -35%;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
.change button {
  margin-top: 20px;
  background: #0b6dff;
  color: white;
  width: 50%;
  border: 0;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1.1em;
  cursor: pointer;
}
@media(max-width: 700px) {
  .change form {
    margin: 7vh auto;
    max-width: 50vw;
  }
  .change input {
    display: block;
    font-size: 0.8em;
    font-weight: bold;
    letter-spacing: 1px;
    border: none;
    outline: none;
    width: 100%;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 10px;
  }
  .change input[type="text"] {
    text-transform: capitalize;
  }
  .change form label {
    color: #aaa;
    display: inline-block;
    font-size: 0.6em;
    position: relative;
    top: 10px;
    left: -10vw;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  .change button {
    margin-top: 20px;
    background: #0b6dff;
    color: white;
    width: 50vw;
    border: 0;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 1.1em;
    cursor: pointer;
  }
}
</style>