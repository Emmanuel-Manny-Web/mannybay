<template>
<div>
  <router-view />
</div>
</template>

<script>
import { setAccessToken } from './accessToken'
export default {
  // created() {
  //   fetch("http://localhost:3000/material/refresh_token", {
  //     method: "POST",
  //     credentials: "include"
  //   }).then(async (res) => {
  //     const { accessToken } = await res.json();
  //     setAccessToken(accessToken)
  //   })
  //  }
}
</script>

<style>
a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
