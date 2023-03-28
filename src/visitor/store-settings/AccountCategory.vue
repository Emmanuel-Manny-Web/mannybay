<template>
  <div class="ps-2 pb-3">
    <div class="container">
      <div class="mt-3">
        <p class="fw-bold">
          Your shop category is: &nbsp;<span style="text-transform: capitalize;">{{ userCategory }}</span>
        </p>
      </div>
      <div>
        <label for="name">
          <p class="text-success fw-bold">Change category to</p>
        </label>
        <input type="text" class="form-control mt-2" style="text-transform: capitalize;" @click="setShow" v-model="choice" @keyup="keyPress">
        <div class="rounded border mt-2" style="overflow: hidden;" v-if="showCategories && filterCategories.length > 0">
          <div class="border-bottom ps-3 mt-2 row align-items-center" v-for="(category, index) in filterCategories" :key="index" @click="setCategory(category)">
            <p class="fw-bold text-muted fw-light">{{ capitalize(category) }}</p>
          </div>
        </div>
        <div v-if="filterCategories.length < 1" class="rounded border mt-2 pt-3" style="overflow: hidden;">
          <p class="fw-bold text-center">No results found</p>
        </div>
      </div>
      <div class="mt-2">
        <p class="text-danger fw-bold">{{ error }}</p>
      </div>
      <div class="text-center mt-3">
        <a class="btn btn-success border-radius-50 text-white fw-bold" href="javascript:void(0)" @click="changeCategory">Change</a>
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
    const userCategory = ref('')
    const error = ref('')
    const capitalize = (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    const categories = ref(["clothing", "electronics", "health & Medicine", "automobiles & repair parts", "oil & gas", "technology"])
    const showCategories = ref(false)
    const choice = ref('')
    const array = ref([])
    const router = useRouter()

    const setShow = () => {
      showCategories.value = !showCategories.value
    }

    const keyPress = () => {
      error.value = ""
      showCategories.value = true
      array.value.pop()
    }

    const setCategory = (val) => {
      error.value = ""
      array.value.pop()
      array.value.push(val.toLowerCase())
      choice.value = val.toLowerCase()
      showCategories.value = false
    }

    const filterCategories = computed(() => {
      return categories.value.filter((category) => {
        category = category.toLowerCase()
        choice.value = choice.value.toLowerCase()
        if(choice.value == '') {
          return category
        } else {
          if (category.match(choice.value)) {
            return category
          }
        }
      })
    })

    const changeCategory = async () => {
      if(array.value.length < 1) {
        error.value = "Choose a category from the dropdown"
      } else {
        if(categories.value.includes(array.value[0])) {
          const res = await API.changeCategory({ category: array.value[0]})
          if(res.ok) {
            router.go()
          } else {
            if(res.error) {
              error.value = "Error occured while changing category"
            }
          }
        }
      }
    }

    onBeforeMount(async () => {
      const res = await API.getUserStore()
      userCategory.value = res.store.categories
    })
    return { userCategory, error, capitalize, changeCategory, categories, setShow, showCategories, filterCategories, choice, setCategory, keyPress }
  }
}
</script>

<style>

</style>