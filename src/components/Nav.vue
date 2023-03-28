<template>
  <div>
    <a href="javascript:void(0)" @click="logout">Logout</a>
  </div>
</template>

<script>
import API from '../Api'
export default {
  name: 'Nav',
  methods: {
    async logout() {
      this.$store.dispatch("auth", null)
      localStorage.removeItem("authenticated")
      await API.logoutAdmin()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
  div {
    margin-bottom: 50px;
  }
  a {
    position: absolute;
    top: 10px;
    right: 5vw;
    text-decoration: none;
    color: #2c3e50;
  }
  a:hover {
    color: #111;
  }
</style>