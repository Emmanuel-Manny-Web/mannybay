<template>
  <div>
    <div class="row mt-3">
      <div class="col-6">
        <input type="text" class="form-control" readonly placeholder="Port Harcourt" v-model="location.state">
      </div>
      <div class="col-6">
        <input type="number" class="form-control" placeholder="Amount" name="ph" v-model="location.amount">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['location']
}
</script>

<style>

</style>