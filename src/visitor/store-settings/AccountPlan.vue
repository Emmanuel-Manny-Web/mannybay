<template>
  <div class="ps-2 pb-3">
    <div class="container">
      <div class="mt-3">
        <p class="fw-bold">
          Your current plan is: &nbsp;<span style="text-transform: capitalize;">{{ userPlan }}</span>
        </p>
        <p v-if="userPlan == 'professional'">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum iusto numquam quod expedita blanditiis reprehenderit, quam sed suscipit molestias quisquam exercitationem quia repellat quidem excepturi laudantium. Aliquid sed facere rem.</p>
        <p v-if="userPlan == 'individual'">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est itaque in explicabo illum totam porro quod laudantium qui, alias rerum asperiores id obcaecati earum nobis doloribus repudiandae vitae officia quasi.</p>
      </div>
      <div>
        <label for="name">
          <p class="text-success fw-bold">Change store plan</p>
        </label>
        <select name="plan" id="" class="form-control mt-2" v-model="plan" @click="error = ''">
          <option value="">Select a plan</option>
          <option :value="plan" v-for="(plan, index) in planFilter" :key="index" style="text-transform: capitalize;">{{ capitalize(plan) }}</option>
        </select>
      </div>
      <div class="mt-2">
        <p class="text-danger fw-bold">{{ error }}</p>
      </div>
      <div class="text-center mt-3">
        <a class="btn btn-success border-radius-50 text-white fw-bold" href="javascript:void(0)" @click="changePlan">Change</a>
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
    const userPlan = ref('')
    const plans = ref(["individual", "professional"])
    const error = ref('')
    const plan = ref('')
    const router = useRouter()

    const capitalize = (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()

    const planFilter = computed(() => {
      return plans.value.filter((plan) => plan !== userPlan.value)
    })

    const changePlan = async () => {
      if(plan.value !== '') {
        const res = await API.changePlan({ plan: plan.value })
        if(res.ok) {
          router.go()
        }
      } else {
        error.value = "Choose a plan you'd like to change to"
      }
    }
    
    onBeforeMount(async () => {
      const res = await API.getUserStore()
      userPlan.value = res.store.plan
      console.log(res)
    })
    return { userPlan, error, changePlan, planFilter, capitalize, plan }
  }
}
</script>

<style>

</style>