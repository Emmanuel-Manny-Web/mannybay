<template>
  <div class="container">
    <router-link :to="{ name: 'Profits' }" class="text-decoration-none">
      <p class="fw-bolder text-center my-3">Profit</p>
    </router-link>
    <p class="text-center" v-if="!data.totalProfit">You have not made any sale!</p>
    <p class="text-center" v-else>Total profit made from the sale of all your goods and services after deduction of company transaction fee is &#x20A6; <span class="fw-bold">{{ Number(data.totalProfit).toLocaleString() }}</span></p>
  </div>
</template>

<script>
export default {
  props: ["data"],
  setup(props) {
    console.log(props.data)
  }
}
</script>

<style>

</style>