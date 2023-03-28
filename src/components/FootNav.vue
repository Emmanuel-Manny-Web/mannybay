<template>
  <nav class="navbar fixed-bottom navbar-light bg-light">
    <div class="container-fluid justify-content-center">
      <router-link class="navbar-brand" :to="{name: 'AllNotification'}">
        <img src="../visitor/bootstrap-icons-1.5.0/bell.svg" alt="AllNotification" class="img-fluid">
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'FootNav'
}
</script>

<style>

</style>