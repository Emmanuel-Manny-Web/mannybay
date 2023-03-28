<template>
  <div>
    <p class="text-start fw-bold mt-3">Set your delivery price based on regions</p>
    <div class="row g-3">
      <div class="col-6">
        <input type="text" class="form-control" placeholder="South-South" readonly name="ss">
      </div>
      <div class="col-6">
        <input type="number" class="form-control" placeholder="Amount" name="southsouth" v-model="location.ss">
      </div>
      <div class="col-6">
        <input type="text" class="form-control" placeholder="South-West" readonly name="sw">
      </div>
      <div class="col-6">
        <input type="number" class="form-control" placeholder="Amount" name="southwest" v-model="location.sw">
      </div>
      <div class="col-6">
        <input type="text" class="form-control" placeholder="South-East" readonly name="se">
      </div>
      <div class="col-6">
        <input type="number" class="form-control" placeholder="Amount" name="southeast" v-model="location.se">
      </div>
      <div class="col-6">
        <input type="text" class="form-control" placeholder="North-Central" readonly name="nc">
      </div>
      <div class="col-6">
        <input type="number" class="form-control" placeholder="Amount" name="northcentral" v-model="location.nc">
      </div>
      <div class="col-6">
        <input type="text" class="form-control" placeholder="North-East" readonly name="ne">
      </div>
      <div class="col-6">
        <input type="number" class="form-control" placeholder="Amount" name="northeast" v-model="location.ne">
      </div>
      <div class="col-6">
        <input type="text" class="form-control" placeholder="North-West" readonly name="nw">
      </div>
      <div class="col-6">
        <input type="number" class="form-control" placeholder="Amount" name="northwest" v-model="location.nw">
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core'
export default {
  props: ['location']
}
</script>

<style>

</style>