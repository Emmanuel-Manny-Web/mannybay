<template>
  <div class="fixed-bottom navbar-light bg-light">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 text-center py-2 border-end" @click="showCheckout" style="cursor: pointer;">
          <div><i class="fa fa-bell"></i></div>
        </div>
        <div class="col-6 text-center py-2" @click="showProfile" style="cursor: pointer;">
          <div><i class="fa fa-user"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    showProfile() {
      this.$emit('profile')
    },
    showCheckout() {
      this.$emit('checkout')
    }
  }
}
</script>

<style>

</style>