<template>
  <div class="ps-3 py-3">
    <div v-if="$route.params.message" class="bg-success px-4 me-3" id="message">
      <p class="fw-light text-white">{{ $route.params.message }}</p>
    </div>
    <div class="d-flex">
      <OffCanvas />
      <div class="container-fluid text-end pt-1">
        <router-link :to="{ name: 'ManageAccount' }" class="btn btn-sm border-none fw-bolder text-muted" style="white-space: nowrap">List item for sale</router-link>
        <router-link :to="{ name: 'StoreSetting' }" class="btn btn-sm border-none fw-bolder text-muted" style="white-space: nowrap">
          Store settings
        </router-link>
      </div>
    </div>
    <div class="px-3 text-center mt-3">
      <p class="">Items you have listed for sale</p>
    </div>
    <div class="container">
      <div class="row g-3">
        <div class="col-12" v-for="(item, index) in items" :key="index">
          <router-link :to="{ name: 'EditItem', params: { id: item._id }}" class="text-decoration-none">
            <div class="row">
              <div class="col">
                <img :src="`/images/${image}`" alt="" v-for="(image, index) in item.image.split(',')" :key="index" v-show="index == 0" class="img-fluid" width="60" id="image">
              </div>
              <div class="col my-auto">
                <p class="" style="">{{ item.name }}</p>
              </div>
              <div class="col my-auto">
                <p class="">{{ Number(item.price).toLocaleString() }}</p>
              </div>
              <div class="col my-auto">
                <p class="">Qty: &nbsp;{{ Number(item.quantity).toLocaleString() }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onUnmounted, ref } from 'vue'
import API from "../axios"
import OffCanvas from '../components/ProfileOffCanvas.vue'
import { useRoute } from 'vue-router'
export default {
  components: { OffCanvas },
  setup() {
    const items = ref([])
    const route = useRoute()
    onBeforeMount(async() => {
      const res = await API.getUserStoreItems()
      items.value = res.items
      if(route.params.message) {
        setTimeout(() => {
          let div = document.querySelector("#message")
          div.remove()
        }, 4000)
      }
    })
    return { items }
  }
}
</script>

<style scoped>
  #image {
    border: none;
    border-radius: 0%;
    outline: none;
    height: 60px;
  }
</style>