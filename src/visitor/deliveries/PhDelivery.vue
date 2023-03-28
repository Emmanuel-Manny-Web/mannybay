<template>
  <div>
    <div class="row mt-3">
      <div class="col-6">
        <input type="text" class="form-control" readonly placeholder="Port Harcourt" v-model="objPh.state">
      </div>
      <div class="col-6">
        <input type="number" class="form-control" placeholder="Amount" name="ph" v-model="objPh.amount">
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core'
export default {
  props: ['objPh']
}
</script>

<style>

</style>