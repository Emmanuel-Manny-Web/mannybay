<template>
  <div class="container py-3">
    <div class="row justify-content-center align-items-center">
      <div class="col-12" v-for="(result, index) in results" :key="index">
        <div class="card">
          <div class="card-header text-center">
            <p class=""><span class="fw-bold">Buyer: &nbsp;</span>{{ result.buyer }}</p>
          </div>
          <div class="card-body">
            <p class="card-title">Amount sold: &nbsp;<span class="fw-bold">&#x20A6; {{ Number(result.sellerIncome + result.companyIncome).toLocaleString() }}</span></p>
            <p class="card-title">Income made: &nbsp;<span class="fw-bold">&#x20A6; {{ Number(result.sellerIncome).toLocaleString() }}</span></p>
            <p class="card-title">Company Income: &nbsp; <span class="fw-bold">&#x20A6; {{ Number(result.companyIncome).toLocaleString() }}</span></p>
            <div>
              <p class="text-center fw-bold mt-2">Items Sold</p>
              <div v-for="product in Object.keys(result.products)" :key="product">
                <div v-for="item in Object.keys(items)" :key="item" class="row justify-content-start align-items-center g-1">
                  <img :src="`/images/${items[product].image}`" v-if="!items[product].image.includes(',')" class="img-fluid col-6 mb-2">
                  <div v-if="items[product].image.includes(',')" class="col-12">
                    <img :src="`/images/${img}`" v-for="(img) in items[product].image.split(',')" :key="img" class="img-fluid" style="max-height: 150px;">
                  </div>
                  <p v-if="item === product" class="col-6">{{ result.products[product] }} {{ items[product].name }} &nbsp;= &nbsp;<span class="fw-bold">&#x20A6; {{ Number(items[product].price).toLocaleString() }}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <p class="">Payment Date: &nbsp;<span class="fw-bold">{{ new Date(result.payDate) }}</span></p>
          </div>
        </div>
      </div>
    </div>
    <p class="mt-3">Total Income made from all your sales is: &nbsp;<span class="fw-bold">&#x20A6; {{ Number(sum).toLocaleString() }}</span></p>
  </div>
</template>

<script>
import { onBeforeMount, ref } from '@vue/runtime-core'
import API from '../axios'
export default {
  setup() {
    const results = ref([])
    const items = ref({})
    const sum = ref(0)
    onBeforeMount(async () => {
      const { incomes } = await API.customerAnalytics()
      results.value = incomes
      incomes.forEach((income) => {
        const { products } = income
        Object.keys(products).map(async (product) => {
          const { result } = await API.getCustomerStoreItem(product)
          if(Object.keys(items.value).every((key) => key !== product)) {
            items.value[product] = result
          }
        })
        sum.value += income.sellerIncome
      })
      console.log(items.value)
    })
    return { results, items, sum }
  }
}
</script>

<style>

</style>