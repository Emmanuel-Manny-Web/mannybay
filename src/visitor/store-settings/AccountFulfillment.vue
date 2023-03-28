<template>
  <div class="ps-2 pb-3">
    <div class="container">
      <div class="mt-3">
        <p class="fw-bold">
          Your products are currently fulfilled by: &nbsp;<span style="text-transform: capitalize;">{{ userFulfillment }}</span>
        </p>
        <p>{{ text.text }}</p>
      </div>
      <div>
        <label for="name">
          <p class="text-success fw-bold">Change fulfillment to</p>
        </label>
        <select name="plan" id="" class="form-control mt-2" v-model="plan" @click="error = ''">
          <option value="">Select a plan</option>
          <option :value="fulfill" v-for="(fulfill, index) in filterFulfillment" :key="index" style="text-transform: capitalize;">{{ capitalize(fulfill.plan) }}</option>
        </select>
      </div>
      <div v-if="plan" class="mt-2">
        <p>{{ selected.text }}</p>
      </div>
      <div class="mt-2">
        <p class="text-danger fw-bold">{{ error }}</p>
      </div>
      <div class="text-center mt-3">
        <a class="btn btn-success border-radius-50 text-white fw-bold" href="javascript:void(0)" @click="changeFulfillment">Change</a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import API from '../../axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const userFulfillment = ref('')
    const fulfillment = ref([{ plan: 'mannybay', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum iusto numquam quod expedita blanditiis reprehenderit, quam sed suscipit molestias quisquam exercitationem quia repellat quidem excepturi laudantium. Aliquid sed facere rem.'}, { plan: 'self', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque in explicabo illum totam porro quod laudantium qui, alias rerum asperiores id obcaecati earum nobis doloribus repudiandae vitae officia quasi.'}])
    const error = ref('')
    const text = ref({})
    const selected = ref({})
    const plan = ref('')
    const capitalize = (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    const router = useRouter()

    const filterFulfillment = computed(() => {
      return fulfillment.value.filter(fulfill => fulfill.plan !== userFulfillment.value)
    })

    const changeFulfillment = async () => {
      const res = await API.changeFulfillment({ fulfillment: plan.value['plan'] })
      if(res.ok) {
        router.go()
      } else {
        error.value = res.error
      }
    }

    onBeforeMount(async () => {
      const res = await API.getUserStore()
      userFulfillment.value = res.store.fulfillment
      fulfillment.value.filter(fulfill => {
        if(fulfill.plan == userFulfillment.value) {
          text.value = fulfill
        } else {
          selected.value = fulfill
        }
      })
    })
    return { userFulfillment, error, capitalize, filterFulfillment, text, changeFulfillment, plan, selected }
  }
}
</script>

<style>

</style>