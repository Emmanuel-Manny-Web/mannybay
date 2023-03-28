<template>
  <div id="create-store" class="pb-5 pt-3 px-3">
    <div class="text-center">
      <p class="fw-bold">Choose A Selling Plan</p>
      <div class="row mb-2">
        <div class="col-12 col-lg-6 justify-content-center align-items-center">
          <a class="nav-link" href="#products">
            <div class="card" @click="selectPlan('individual')" id="individual">
              <div class="card-body">
                <p>Individual Plan</p>
                <p>300 naira per unit sold</p>
                <a href="#" class="text-decoration-none card-text">Why choose this?</a>
                <!-- <p>You want to advertise your product</p> -->
              </div>
            </div>
          </a>
        </div>
        <div class="col-12 col-lg-6 justify-content-center align-items-center">
          <a class="nav-link" href="#products">
            <div class="card" @click="selectPlan('professional')" id="professional">
              <div class="card-body">
                <p style="white-space: nowrap;">Professional Plan</p>
                <p>20,000 naira per month</p>
                <a href="#" class="text-decoration-none card-text">Why choose this?</a>
                <!-- <p>You sell more than 20 items a month</p>
                <p>You want to advertise your product</p>
                <p>You want to qualify for top placement on product detail pages</p>
                <p>You want to sell products in restricted categories</p>
                <p>You want to use advanced selling tools like reports and statitics</p> -->
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <section id="products">
      <div class="text-center mt-5">
        <h6 class="fw-bold text-muted mb-4">Choose Fulfillment Plan?</h6>
        <div class="row justify-content-center align-items-center g-2">
          <div class="col col-lg-6" @click="FBM">
            <a class="nav-link" href="#categories">
              <div class="card" style="cursor: pointer;" id="fbm">
                <div class="card-body">
                  <h6 class="fw-bold text-muted card-title">Fulfill Orders By MannyBay</h6>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel eum ad culpa voluptatum ratione repudiandae iure eos nihil quisquam nemo maiores excepturi, quia maxime labore alias, sed vero tempora laboriosam.</p>
                </div>
              </div>
            </a>
          </div>
          <div class="col col-lg-6" @click="FBS">
            <a class="nav-link" href="#categories">
              <div class="card" style="cursor: pointer;" id="fbs">
                <div class="card-body">
                  <h6 class="fw-bold text-muted card-title">Fulfill Orders By Self</h6>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non inventore iure ea soluta aliquid temporibus modi amet, ab recusandae distinctio quos hic adipisci saepe. Aspernatur facilis quia adipisci quas soluta!</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="mt-5" id="categories">
        <div class="text-center">
          <p class="fw-bold">What do you want to sell?</p>
          <small class="text-muted h6">Select categories that fit your products</small>
        </div>
        <div class="row justify-content-center align-items-center mt-3 g-3">
          <div class="col rounded-pill border pt-2" v-for="(product, index) in products" :key="index" @click="selectProducts(index, product)" :id="index" style="cursor: pointer;">
            <div class="text-center d-flex justify-content-center">
              <p class="fw-bold" style="white-space: nowrap;">{{ product }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-3">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title text-muted text-center">Note</h6>
          <p class="card-text">Mannybay charges a referral fee of 15% for each item sold.</p>
        </div>
      </div>
      <div class="mt-3">
        <input type="text" placeholder="What is the name of your store?" v-model="store" name="store" class="form-control form-control-user">
      </div>
      <div class="text-center mt-3">
        <a class="btn btn-success border-5 fw-bold" href="#bank-account" @click="createStore">Create Store</a>
      </div>
      <div class="text-center mt-2">
        <p class="error fw-bold"></p>
      </div>
    </section>
    <section id="bank-account" v-if="enableAccount" class="mt-5">
      <div class="text-center">
        <h6 class="fw-bold text-muted">Fill in your bank details</h6>
        <p class="fw-bold text-primary">Currently for Nigerian merchants only</p>
      </div>
      <div class="container-lg">
        <form action="" method="POST" @submit.prevent="createAccount">
          <div class="row justify-content-center align-items-center g-3">
            <div class="col-lg-6">
              <label for="accountname" class="form-label">Account Name</label>
              <input type="text" class="form-control" placeholder="Bank Account Name" name="accountname" id="accountname" v-model="accountname">
            </div>
            <div class="col-lg-6">
              <label for="accountnumber" class="form-label">Account Number</label>
              <input type="number" class="form-control" placeholder="Bank Account Number" name="accountnumber" id="accountnumber" v-model="accountnumber">
            </div>
            <div class="mt-3">
              <label for="bankname" class="form-label">Bank Name</label>
              <select name="bankname" id="" class="form-select" v-model="bankname">
                <option value="uba">United Bank for Africa</option>
                <option value="gtb">Guarantee Trust Bank</option>
                <option value="firstbank">First Bank of Nigeria</option>
                <option value="ecobank">Ecobank</option>
              </select>
            </div>
            <div class="text-center">
              <button class="btn btn-success btn-sm fw-bold"><a class="text-decoration-none text-white">Register Bank Account</a></button>
            </div>
            <div class="register-error text-center">
              <p class="fw-bold" id="reg-error"></p>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import API from '../axios'
export default {
  setup() {
    const obj = ref({plan: '', fulfillment: '', categories: '', storename: ''})
    const products = ref(['Electronics', 'Health & Medicine', 'Technology', 'Clothing', 'Automobiles & Repair parts', 'Oil & Gas'])
    const selectedProducts = ref([])
    const store = ref('')
    const id = ref('')
    const enableAccount = ref(false)
    const email = ref('')
    const accountname = ref('')
    const accountnumber = ref()
    const bankname = ref('')
    const router = useRouter()
    const selectPlan = (val) => {
      obj.value["plan"] = val
      if(val === 'individual') {
        let element = document.querySelector(`#${val}`)
        element.classList.add('border-success')
        element.classList.add('shadow-lg')
        let elem = document.querySelector("#professional")
        elem.classList.remove('border-success')
        elem.classList.remove('shadow-lg')
      }
      if(val === 'professional') {
        let element = document.querySelector(`#${val}`)
        element.classList.add('border-success')
        element.classList.add('shadow-lg')
        let elem = document.querySelector("#individual")
        elem.classList.remove('border-success')
        elem.classList.remove('shadow-lg')
      }
    }
    const FBM = () => {
      const id = document.querySelector("#fbm")
      id.classList.add('shadow-lg')
      id.classList.add('border-success')
      const element = document.querySelector("#fbs")
      element.classList.remove("shadow-lg")
      element.classList.remove("border-success")
      obj.value.fulfillment = 'mannybay'
    }
    const FBS = () => {
      const id = document.querySelector("#fbs")
      id.classList.add('shadow-lg')
      id.classList.add('border-success')
      const element = document.querySelector("#fbm")
      element.classList.remove("shadow-lg")
      element.classList.remove("border-success")
      obj.value.fulfillment = 'self'
    }
    const selectProducts = (index, item) => {
     if(selectedProducts.value.includes(item)) {
       selectedProducts.value = selectedProducts.value.filter((product) => product != item)
       const element = document.getElementById(index)
       element.classList.remove('border-info')
     } else {
       selectedProducts.value.push(item)
       const element = document.getElementById(index)
       element.classList.add('border-info')
     }
     obj.value['categories'] = selectedProducts.value.toString()
    }
    const hasWhiteSpace = (s) => {
      return (/\s/).test(s)
    }
    const createStore = async () => {
      let error = document.querySelector(".error")
      error.textContent = ''
      if(hasWhiteSpace(store.value)) error.textContent = "Store name cannot have a space in between"
      else obj.value['storename'] = store.value
      if (obj.value['storename'] && obj.value['categories'] && obj.value['plan'] && obj.value['fulfillment']) {
        enableAccount.value = true
      } else {
        error.textContent = 'Fill in all fields'
        error.style.color = 'red'
      }
    }
    const createAccount = async () => {
      accountnumber.value = accountnumber.value.toString()
      if(accountnumber.value.length < 10) {
        let length = 10 - accountnumber.value.length
        for (let i = 0; i < length; i++) {
          accountnumber.value = "0" + accountnumber.value
        }
      }
      if (obj.value['storename'] && obj.value['categories'] && obj.value['plan'] && obj.value['fulfillment'] && accountname.value && accountnumber.value && bankname.value) {
        const res = await API.createStore({
          accountname: accountname.value,
          accountnumber: accountnumber.value,
          email: email.value,
          bankname: bankname.value,
          plan: obj.value.plan,
          fulfillment: obj.value.fulfillment,
          categories: obj.value.categories,
          storename: obj.value.storename,
          userid: id.value
        })
        if(res.ok) {
          router.push({ name: 'Account' })
        }
      } else {
        let element = document.querySelector("#reg-error")
        element.textContent = 'Fill in all fields'
        element.classList.add('text-danger')
      }
    }
    onMounted(async () => {
      const res = await API.getUser()
      email.value = res.user.email
      id.value = res.user._id
    })
    return { selectPlan, FBM, FBS, products, selectProducts, selectedProducts, store, createStore, enableAccount, createAccount, accountname, accountnumber, bankname }
  }
}
</script>

<style>

</style>