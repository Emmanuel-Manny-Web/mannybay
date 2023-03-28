<template>
  <div style="background-color: white; opacity: 1; margin: auto; margin-right: 20px; z-index: 2;" class="">
    <button class="btn btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" id="button" style="">
      <a class="btn btn-sm">
        <!-- <img src="../visitor/bootstrap-icons-1.5.0/justify.svg" alt=""> -->
        <font-awesome-icon icon="bars"  class="text-dark"/>
      </a>
    </button>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas">
      <div class="offcanvas-header">
        <a href="javascript:void(0)" class="offcanvas-title navbar-brand text-secondary">
          <div class="p-0">
            <img src="/images/img-01.png" alt="" class="" style="height: 100px; width: 100px;">
            <p class="my-3 fw-bolder">{{ capitalize(email) }}</p>
          </div>
          <p v-if="storeName !== ''">store name: &nbsp;<small>{{ storeName }}</small></p>
          <p v-if="storeName !== ''">store link: &nbsp;<router-link class="text-decoration-none" :to="{name: 'ClientStore', params:{ storename: storeName }}">{{ origin }}/{{ storeName }}</router-link></p>
        </a>
        <button class="btn-close text-reset" data-bs-dismiss="offcanvas" type="button"></button>
      </div>
      <div class="offcanvas-body">
        <div class="row">
          <div class="col-12">
            <a href="/account" class="text-decoration-none">
              <p class="fw-bold">Dashboard</p>
            </a>
          </div>
          <div class="col-12">
            <p class="fw-bold">Setting</p>
          </div>
          <div class="col-12">
            <a class="fw-bold text-decoration-none text-muted" href="javascript:void(0)" @click="logout">Logout</a>
          </div>
          <div class="col-12 mb-1 fixed-bottom mb-2" v-if="!deactivated && userStore">
            <a href="/account/manage" class="btn btn-success border-radius-50 text-white">
              Manage Store
            </a>
          </div>
          <div class="col-12 mb-1 fixed-bottom mb-2" v-if="!userStore">
            <a href="/account/create" class="btn btn-success border-radius-50 text-white">
              Create Store
            </a>
          </div>
          <div class="col-12 mb-1 fixed-bottom mb-2" v-else>
            <p class="fw-bold">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue"
import API from '../axios'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const userStore = ref()
    const router = useRouter()
    const email = ref('')
    const storeName = ref('')
    const deactivated = ref(false)
    const message = ref('')
    const capitalize = (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    const logout = async () => {
      const res = await API.logout()
      if(res.ok) {
        router.push({ name: "Home" })
      }
    }
    onBeforeMount(async () => {
      const res = await API.getUserStore()
      if(res.store) {
        userStore.value = res.store
        email.value = res.store.email
        storeName.value = res.store.storename

        const result = await API.getDeactivatedAccount()
        if(result.result) {
          deactivated.value = result.result.expired === false ? true : false
          if(deactivated.value) {
            const currentDate = new Date()
            const endDate = new Date(result.result.endDate)
            const days = (endDate - currentDate) / 86400000
            if(days < 1) {
              let hour = days.toString()
              hour = hour.split('.')
              let hours = hour[0]
              hour = hour[1].split('')
              hour = hour[0] + hour[1]
              hours = hours + "." + hour
              hours = parseFloat(hours) * 24
              message.value = `Your store is currently deactivated. You have ${Math.floor(hours)} hour/s left before it is activated.`
            } else {
              message.value = `Your store is currently deactivated. You have ${Math.floor(days)} day/s left before it is activated.`
            }
          }
        }
      } else {
        email.value = res.profile.email
      }
    })
    let origin = location.origin
    origin = origin.split("http://")[1]
    return { userStore, email, storeName, capitalize, logout, deactivated, message, origin }
  }
}
</script>

<style>

</style>