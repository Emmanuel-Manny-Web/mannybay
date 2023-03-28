<template>
<div>
  <p v-if="$route.params.message">{{ $route.params.message }}</p>
  <div class="container-lg">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form class="user" @submit.prevent="login">
                    <div class="form-group">
                      <input type="text" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Username..." v-model="useruid">
                      <div class="text-start mt-3 ms-3 text-danger fw-bold" v-if="useruidError">
                        {{ useruidError }}
                      </div>
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" v-model="password">
                      <div class="text-start mt-3 ms-3 text-danger fw-bold" v-if="passwordError">
                        {{ passwordError }}
                      </div>
                    </div>
                    <button href="javascript:void(0)" class="btn btn-primary btn-user btn-block fw-bold mt-4" style="font-size: 0.9em;">
                      Login
                    </button>
                  </form>
                  <hr>
                  <!-- <div class="text-center">
                    <router-link class="small text-decoration-none" :to="{ name: 'Create' }">
                      Forgot Password?
                    </router-link>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="data.length <= 0" class="else">
    <router-link :to="{ name: 'Create' }">Create An Admin</router-link>
  </div>
</div>
</template>

<script>
import Api from '../Api'

export default {
  data() {
    return {
      data: [],
      useruid: '',
      password: '',
      useruidError: '',
      passwordError: ''
    }
  },
  methods: {
    async login() {
      this.passwordError = this.password.length > 5 ? '' : 'Password must be at least 6 chars long';
      this.useruidError = ''
      this.passwordError = ''
      if(!this.passwordError) {
        const response = await Api.loginAdminIntoDB({
          useruid: this.useruid,
          password: this.password
        })
        if(response.errors) {
          this.useruidError = response.errors.useruid
          this.passwordError = response.errors.password
        } else {
          localStorage.setItem('authenticated', response.token)
          this.$store.dispatch('auth', response.token)
          this.$router.push({ name: "Master", params: { id: response.user._id } })
        }
      }
    }
  },
  async created() {
    const response = await Api.getAllAdmin()
    this.data = response
    console.log(this.data)
  }
}
</script>

<style scoped>

</style>