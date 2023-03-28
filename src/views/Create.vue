<template>
  <div class="change">
    <h3>Create An Admin</h3>
    <form @submit.prevent="createAdmin" class="createform">
    <label>Username</label>
    <input type="text" name="useruid" v-model="useruid" placeholder="Username">
    <div class="useruid error" v-if="useruidError" style="color: crimson; font-family: sans-serif; font-size: 0.9em; font-weight: bold;">
      {{ useruidError }}
    </div>
    <label>Password</label>
    <input type="password" placeholder="Password" name="password" v-model="password">
    <div class="password error" v-if="passwordError" style="color: crimson; font-family: sans-serif; font-size: 0.9em; font-weight: bold;">
      {{ passwordError }}
    </div>
    <button>Create</button>
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
      passwordError: '',
      useruidError: ''
    }
  },
  methods: {
    async createAdmin() {
      this.passwordError = this.password.length > 5 ? '' : 'Password must be at least 6 chars long';
      this.useruidError = ''
      this.passwordError = ''
      if(!this.passwordError) {
        const response = await API.createAdmin({
          useruid: this.useruid,
          password: this.password
        })
        if(response.errors) {
          this.useruidError = response.errors.useruid
          this.passwordError = response.errors.password
        }
        if (response.results) {
          this.$router.push({ name: 'Login', params: { message: response.message }})
        }
      }
    }
  }
}
</script>

<style scoped>
.change {
  text-align: center;
}
.change form {
max-width: 50vw;
margin: 30px auto;
text-align: left;
}
.change .createform label {
  color: #aaa;
  display: block;
  position: relative;
  margin-top: 20px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
.change input {
display: block;
margin-top: 30px;
font-size: 0.9em;
font-weight: bold;
letter-spacing: 1px;
border: none;
outline: none;
width: 100%;
padding-bottom: 10px;
border-bottom: 1px solid gainsboro;
}
.change input[type="text"] {
  text-transform: capitalize;
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
  .change {
    text-align: center;
  }
  .change h3 {
    font-family: sans-serif;
    font-size: 1.25em;
    color: dimgrey;
    margin-top: 50px;
  }
  .change form {
    max-width: 50vw;
    text-align: left;
    margin-top: 50px;
  }
  .change .createform label {
    color: #aaa;
    display: block;
    position: relative;
    margin-top: 20px;
    font-size: 0.6em;
    font-family: sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
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
  /* .change form label {
    color: #aaa;
    display: inline-block;
    font-size: 0.6em;
    position: relative;
    top: 10px;
    left: -10vw;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  } */
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