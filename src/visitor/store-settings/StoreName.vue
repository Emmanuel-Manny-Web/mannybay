<template>
  <div class="ps-2 pb-3">
    <div class="container">
      <div class="mt-3">
        <p class="fw-bold">
          The name of your store is: &nbsp;<span style="text-transform: capitalize;">{{ name }}</span>
        </p>
      </div>
      <div>
        <label for="name">
          <p class="text-success fw-bold">Change store name</p>
        </label>
        <input type="text" name="name" class="form-control" id="name" v-model="name" @keyup="error = ''">
      </div>
      <div class="mt-2">
        <p class="text-danger fw-bold">{{ error }}</p>
      </div>
      <div class="text-center mt-3">
        <a class="btn btn-success border-radius-50 text-white fw-bold" href="javascript:void(0)" @click="changeName">Change</a>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue"
import API from '../../axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = ref({})
    const name = ref('')
    const router = useRouter()
    const error = ref('')

    const changeName = async () => {
      if (name.value && name.value.length > 5) {
        const res = await API.changeStoreName({
          name: name.value
        })
        if(res.ok) {
          router.push({ name: 'StoreName' })
        } else {
          if(res.error) {
            error.value = res.error
          } else {
            error.value = ""
          }
        }
      } else {
        error.value = "Name must be greater than 5 characters!"
      }
    }
    onBeforeMount(async () => {
      const res = await API.getUserStore()
      store.value = res.store
      name.value = res.store.storename
    })
    return { store, name, changeName, error }
  }
}
</script>

<style>

</style>