<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light ps-2 pt-3">
      <div class="container-xxl">
        <router-link :to="{ name: 'Home' }" class="navbar-brand">
          <span class="text-secondary">
            mannybay
          </span>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- collapsable nav content -->
        <div class="collapse navbar-collapse justify-content-end align-items-center me-3" id="main-nav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{ name: 'About' }" class="nav-link" href="#topic">
                <img src="../visitor/bootstrap-icons-1.5.0/book.svg" alt="" class="img-fluid me-1 mb-1">
                About
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Account' }">
                <i class="fa fa-user img-fluid me-1 mb-1"></i>
                <!-- <img src="../visitor/bootstrap-icons-1.5.0/person-circle.svg" alt="" class="img-fluid me-1 mb-1"> -->
                Account
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link" href="#contact">
                <i class="fa fa-phone img-fluid me-1 mb-1"></i>
                Contact
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useRouter } from "vue-router"
export default {
  name: 'UserNav',
  setup() {
    const router = useRouter()
    const register = () => {
      router.push({ name: 'SignIn' })
    }
    return { register }
  }
}
</script>

<style>

</style>