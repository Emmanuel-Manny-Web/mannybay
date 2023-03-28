<template>
  <div class="limiter">
    <div class="container-login100">
    <div class="wrap-login100">
    <div class="login100-pic js-tilt" data-tilt="" style="will-change: transform; transform: perspective(300px) rotateX(0deg) rotateY(0deg);">
      <img src="/images/img-01.png" alt="IMG">
    </div>
    <form class="login100-form validate-form" @submit.prevent="signUp" method="POST">
      <div v-if="message" style="text-align: center;" class="error"><p style="color: red;">{{ message }}</p></div>
    <span class="login100-form-title">
    Member SignUp
    </span>
    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
    <input class="input100" type="text" name="email" placeholder="Email" v-model="email">
    <span class="focus-input100"></span>
    <span class="symbol-input100">
    <i class="fa fa-envelope" aria-hidden="true"></i>
    </span>
    </div>
    <div class="wrap-input100 validate-input" data-validate="Password is required">
    <input class="input100" type="password" name="password" placeholder="Password" v-model="password">
    <span class="focus-input100"></span>
    <span class="symbol-input100">
    <i class="fa fa-lock" aria-hidden="true"></i>
    </span>
    </div>
    <div class="wrap-input100 validate-input" data-validate="Phone number is required">
      <input class="input100" id="phone" type="tel" name="phone" v-model="phone">
    </div>
    <div class="wrap-input100 validate-input" data-validate="Delivery address is required">
      <textarea name="" id="" class="input100" cols="30" rows="5" style="resize: none; padding: 10px 25px;" placeholder="Type in your delivery address" v-model="location"></textarea>
    </div>
    <div class="container-login100-form-btn">
    <button class="login100-form-btn">
    SignUp
    </button>
    </div>
    </form>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API from '../axios'
import { setAccessToken } from '../accessToken'
export default {
	data() {
		return {
			email: "",
			password: "",
      phone: null,
      location: "",
			message: this.$route.params.message
		}
	},
	methods: {
		async signIn() {
      const response = await API.signIn({
        email: this.email,
        password: this.password
      })
      if (!response.errors) {
        setAccessToken(response.token)
        const res = await axios.get(`http://localhost:3000/material/buy`, {
          headers: {
            Authorization: "Bearer " + response.token
          }
        })
        if (res.data) {
          this.$router.push({ name: 'Buy' })
        }
      }
    },
    async signUp() {
      if(this.email != "" && this.password != "" && this.phone != "" && this.location != "") {
        const response = await API.signUp({
          email: this.email,
          password: this.password,
          phone: this.phone,
          location: this.location
        })
        if (!response.errors) {
          this.$router.push({ name: 'SignIn' })
        } else {
          this.message = response.errors.useruid
        }
      } else {
        this.message = "Fill in all fields"
      }
    }
	},
  mounted() {
    
  }
}
</script>

<style scoped>
.nav-tabs.card-header-tabs.nav-link.active {
    background-color: transparent;
    border-bottom-color: transparent;
  }
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #fe696a;
    background-color: transparent;
    border-color: #fe696a;
  }
  .nav-tabs .nav-link {
      position: relative;
      border: 0;
  }
  .nav-link:hover, .nav-link:focus {
    color: #fe696a;
  }
  a:hover {
    color: #fe3638;
    text-decoration: none;
  }
  .accord-btn:hover {
    color: #fe3638;
    text-decoration: none;
  }
  .shipping {
    border: none;
    outline: none;
  }
  .checkout {
    background-color: #fe3638;
  }
  .btn-form {
    background-color: #fe3638;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 2px;
    border: none;
    outline: none;
  }
  .prd-btn {
    outline: 1px solid #fe3638;
    color: #fe3638;
    border: none;
  }
  textarea {
    resize: none;
  }
</style>