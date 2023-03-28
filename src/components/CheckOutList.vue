<template>
  <div>
    <div v-if="data.items.length < 1"><p>No purchase has been made on this account</p></div>
    <div class="container" v-if="data.totalCost">
      <p class="fw-bold">The total amount of money spent on all items purchased is &#x20A6; {{ Number($props.data.totalCost).toLocaleString() }}</p>
    </div>
    <div class="row justify-content-start align-items-center g-3">
      <div class="col-12" v-for="(datum, index) in data.orders" :key="index">
        <div class="card" style="height: inherit;">
          <div class="card-body">
            <p class="card-title fw-bold">
              {{ datum.reference }}
            </p>
            <p class="card-subtitle">
              A purchase of the following items was made on {{ datum.createdAt.split("T")[0] }} at {{ datum.createdAt.split("T")[1].split(".")[0] }} GMT with reference ID <span class="fw-bold">{{ datum.reference }}</span> amounting to the sum of <span class="fw-bold">&#x20A6; {{ Number(datum.amount).toLocaleString() }}</span>
              <ul class="px-1 text-start">
                <li v-for="(product) in Object.keys(datum.quantity)" :key="product">
                  <p v-for="(item, index) in items" :key="index">
                    <span v-if="product === item._id && item.name">{{ datum.quantity[product] }} {{ item.name }} -  &#x20A6; {{ Number(item.price).toLocaleString() }}</span>
                    <span v-if="product === item._id && !item.name">{{ datum.quantity[product] }} {{ item.name }} -  &#x20A6; {{ Number(item.price).toLocaleString() }}</span>
                    <a href="javascript:void(0)" class="d-flex row g-3 mt-1" v-if="datum.quantity[product] && product === item._id">
                      <img :src="`/images/${img}`" v-for="(img) in item.image.split(',')" :key="img" class="img-fluid d-flex col" style="max-height: 150px;">
                    </a>
                  </p>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import API from '../axios'
import { onBeforeMount } from '@vue/runtime-core'
export default {
  props: ["data"],
  setup(props) {
    const array = props.data.items
    const items = ref({})
    onBeforeMount(() => {
      array.forEach((item) => {
        Object.keys(item).forEach(async (i) => {
          let result = await API.getCustomerStoreItem(i)
          if(result.result.name) {
            items.value[i] = result.result
          } else {
            result = await API.getMaterial(i)
            items.value[i] = result
          }
        })
      })
    })
    return { items, length }
  }
}
</script>

<style>

</style>