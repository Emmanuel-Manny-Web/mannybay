<template>
  <div>
    <div class="pt-2 pb-5 px-3 mb-5">
      <UserProfile v-if="profilevar"/>
      <CheckOutList v-if="checkOutvar" :data="data"/>
    </div>
    <div class="">
      <BottomNav @profile="showProfile" @checkout="showCheckout" />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue"
import BottomNav from "../components/BottomNav.vue"
import UserProfile from "../components/UserProfile.vue"
import CheckOutList from "../components/CheckOutList.vue"
import API from "../axios"
export default {
  components: { BottomNav, UserProfile, CheckOutList },
  setup() {
    const profilevar = ref(true)
    const checkOutvar = ref(false)
    const data = ref([])

    const showProfile = () => {
      profilevar.value = true
      checkOutvar.value = false
    }
    const showCheckout = () => {
      checkOutvar.value = true
      profilevar.value = false
    }
    onBeforeMount(async () => {
      const result = await API.customerAnalytics()
      data.value = result
    })
    return { profilevar, checkOutvar, showProfile, showCheckout, data }
  }
}
</script>

<style>

</style>