<template>
  <div class="ps-2 pb-3">
    <div class="container">
      <div class="mt-3">
        <p class="fw-bold">
          Your banking & payment details are as follow &nbsp;
        </p>
      </div>
      <div class="form-group mt-2">
        <label for="name">
          <p class="text-success fw-bold">Bank name</p>
        </label>
        <select name="bankname" id="" class="form-select" v-model="bank['bankname']">
          <option value="uba">United Bank for Africa</option>
          <option value="gtb">Guarantee Trust Bank</option>
          <option value="firstbank">First Bank of Nigeria</option>
          <option value="ecobank">Ecobank</option>
        </select>
      </div>
      <div class="form-group mt-2">
        <label for="account">
          <p class="text-success fw-bold">Account name</p>
        </label>
        <input type="text" class="form-control" id="account" v-model="bank['accountname']">
      </div>
      <div class="form-group mt-2">
        <label for="number">
          <p class="text-success fw-bold">Account number</p>
        </label>
        <input type="number" class="form-control" id="number" v-model="bank['accountnumber']">
      </div>
      <div class="mt-2">
        <p class="text-danger fw-bold">{{ error }}</p>
      </div>
      <div class="text-center mt-3">
        <a class="btn btn-success border-radius-50 text-white fw-bold" href="javascript:void(0)" @click="changeBank">Change</a>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
import API from '../../axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const bank = ref({})
    const error = ref('')
    const router = useRouter()

    const changeBank = async () => {
      console.log(bank.value)
      const res = await API.changeBank({
        bank: bank.value
      })
      if(res.ok) {
        router.go()
      } else if (res.error) {
        error.value = res.error
      }
    }

    onBeforeMount(async () => {
      const res = await API.getUserStore()
      bank.value['accountname'] = res.store.accountname
      bank.value['accountnumber'] = res.store.accountnumber
      bank.value['bankname'] = res.store.bankname
    })
    return { bank, changeBank, error }
  }
}
</script>

<style>

</style>