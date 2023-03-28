<template>
  <div class="limiter">
    <div class="container-login100">
    <div class="wrap-login100">
    <div class="login100-pic js-tilt" data-tilt="" style="will-change: transform; transform: perspective(300px) rotateX(0deg) rotateY(0deg);">
      <img src="/images/img-01.png" alt="IMG">
    </div>
    <form class="login100-form validate-form" @submit.prevent="signIn" method="POST">
    <div v-if="message" style="text-align: center;" class="error"><p style="color: red;">{{ message }}</p></div>
    <span class="login100-form-title">
    Member Login
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
    <div class="container-login100-form-btn">
    <button class="login100-form-btn">
    Login
    </button>
    </div>
    <div class="text-center p-t-12">
    <span class="txt1">
    Forgot
    </span>
    <a class="txt2" href="#">
    Username / Password?
    </a>
    </div>
    <div class="text-center p-t-136">
    <router-link class="txt2" :to="{ name: 'SignUp' }">
    Create your Account
    <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
    </router-link>
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
			message: this.$route.params.message
		}
	},
	methods: {
		async signIn() {
      this.message = ""
      const result = await API.signIn({
        email: this.email,
        password: this.password
      })
      if(!result.errors) {
        setAccessToken(result.token)
        const res = await axios.get(`/material/account`, {
          headers: {
            Authorization: "Bearer " + result.token
          }
        })
        if (res.data.store) {
          this.$router.push({ name: 'Account' })
        } else {
          this.$router.push({ name: "Home" })
        }
      } else {
        this.message = 'Invalid email or password'
        this.password = ''
      }
    },
    async signUp() {
      const response = await API.signUp({
        email: this.email,
        password: this.password
      })
      if (!response.errors) {
        this.$router.push({ name: 'SignIn' })
      }
    }
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
  .error {
    text-align: center;
  }
</style>