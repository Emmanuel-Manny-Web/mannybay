<template>
  <div class="container py-3">
    <h6 class="text-center fw-bold text-secondary">404 page not found</h6>
    <p v-if="error" class="mt-4 text-center">{{ error }}</p>
    <p v-else class="mt-4 text-center">Sorry, the page you're looking for does not exist</p>
    <div class="text-center">
      <a href="/" class="text-decoration-none">Home</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style>

</style>