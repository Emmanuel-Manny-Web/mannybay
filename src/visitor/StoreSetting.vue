<template>
<div class="p-3">
  <div class="d-flex">
    <OffCanvas />
  </div>
  <div class="container mt-2">
    <div v-for="(option, index) in options" :key="index" class="my-3">
      <router-link :to="{ name: names[index] }" class="text-decoration-none text-muted card-link">
        <div class="card">
          <div class="card-body">
            {{ option }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import OffCanvas from '../components/ProfileOffCanvas.vue'
export default {
  components: { OffCanvas },
  setup() {
    const options = ref(["Change store name", "Change plan", "Change fulfillment", "Change categories", "Banking & payment", "Deactivate store"])
    const names = ref(["StoreName", "AccountPlan", "AccountFulfillment", "AccountCategory", "BankAccount", "SuspendStore"])

    return { options, names }
  }
}
</script>

<style>

</style>