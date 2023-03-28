<template>
  <div class="container">
    <p class="fw-bolder my-3 text-center">Transactions</p>
    <div>
      <p>Your recent transactions</p>
      <div class="row justify-content-center align-items-center">
        <div class="col" v-for="(order, index) in data.orders" :key="order._id">
          <div class="card" v-show="index <= 4">
            <div class="card-body">
              <p>You made a purchase of <span class="fw-bold">&#x20A6; {{ Number(order.amount).toLocaleString() }}</span> on {{ order.createdAt.split("T")[0] }} at {{ order.createdAt.split("T")[1].split(".")[0] }} GMT with reference ID <span class="fw-bold">{{ order.reference }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "items"],
  setup(props) {
    
  }
}
</script>

<style>

</style>