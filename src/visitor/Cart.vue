<template>
  <div class="bg-white">
    <!-- Modal -->
    <!-- <div class="modal fade" id="signin-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#signin">
                  <img src="./bootstrap-icons-1.5.0/unlock.svg" alt="">
                  Sign in
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#signup">
                  <img src="./bootstrap-icons-1.5.0/person.svg" alt="">
                  Sign up
                </button>
              </li>
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="tab-content">
              <div class="tab-pane fade show active" id="signin" ref="signinmodal">
                <form method="POST" action="/material/signin" @submit="signIn">
                  <label for="email" class="form-label h5">Email</label>
                  <input type="email" class="form-control my-1" placeholder="johndoe@example.com">
                  <label for="password" class="form-label my-2 h5">Password</label>
                  <input type="password" class="form-control my-1">
                  <div>
                    <button class="btn shadow btn-form text-center d-block text-white my-3 w-100 border-0 outline-0" type="button" data-bs-dismiss="modal" @click="signIn">Sign In</button>
                  </div>
                  <div class="text-end">
                    <a href="#" class="text-decoration-none h6" style="color: #fe3638; font-size: 17px;">Forgot password?</a>
                  </div>
                </form>
              </div>
              <div class="tab-pane fade" id="signup">
                <form method="POST" action="/material/cart" @submit="signUp">
                  <label class="form-label h6">Email</label>
                  <input type="email" name="email" class="form-control my-1" placeholder="johndoe@example.com" v-model="email">
                  <label class="form-label my-2 h5">Password</label>
                  <input type="password" name="password" class="form-control my-1" v-model="password">
                  <div>
                  <label class="form-label my-2 h5">Phone Number</label>
                  </div>
                  <input type="tel" name="phone" class="form-control my-1" v-model="phone" id="phone" required>
                  <div>
                    <button class="btn shadow btn-form text-center d-block text-white my-3 w-100 border-0 outline-0" data-bs-dismiss="modal" type="button" @click="signUp">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <main class="container-fluid">
      <header class="shadow-sm">
        <div class="navbar-sticky bg-light">
          <div class="navbar navbar-expand-lg navbar-light">
            <div class="container">
              <router-link :to="{ name: 'Home' }" class="navbar-brand">mannybay&nbsp;</router-link>
              <div class="navbar-toolbar d-flex flex-shrink-0">
                <button class="btn btn-outline-0 btn-border-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <router-link class="btn btn-outline-0 btn-border-0" :to="{ name: 'Account' }">
                  <img src="./bootstrap-icons-1.5.0/person.svg" alt="" class="img-fluid person">
                </router-link>
                <router-link :to="{ name: 'Cart' }" class="btn btn-outline-0 btn-border-0">
                  <font-awesome-icon icon="cart-arrow-down"  class="text-dark"/>
                  <span class="position-relative top-4 start-4 translate-middle badge rounded-pill bg-danger" v-if="counter">
                    {{ counter }}
                  </span>
                </router-link>
              </div>
              <div class="collapse navbar-collapse justify-content-end align-items-center me-3" id="main-nav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <router-link :to="{ name: 'About' }" class="nav-link" href="#topic">About</router-link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#reviews">Register</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#contact">Contact</a>
                  </li>
                  <li class="nav-item d-lg-none">
                    <a class="nav-link" href="#pricing">Login</a>
                  </li>
                  <li class="nav-item ms-2 d-none d-lg-inline">
                    <a class="btn btn-secondary" href="#pricing">Buy now</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="bg-dark py-4">
        <div class="container">
          <div class="text-center my-3">
          <h5 class="text-white">Your Cart</h5>
          </div>
          <div class="text-end mt-4">
            <button class="btn btn-border-0 prd-btn text-white fw-bold" @click="back">
            <img src="./bootstrap-icons-1.5.0/chevron-left.svg" alt="" class="img-fluid me-3">
              <span class="h6">Continue shopping</span>
            </button>
            </div>
        </div>
      </div>
      <div class="row">
        <section class="col-lg-8">
          <div class="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom" v-for="(item, index) in items" :key="item._id">
            <div class="d-block d-sm-flex align-items-center text-center text-sm-start">
              <a class="d-inline-block flex-shrink-0 mx-auto me-sm-4 my-3" href="#">
                <img :src="`/${item.image}`" alt="" width="160" class="img-fluid" v-if="!item.image.includes(',') && item.category">
                <img :src="`/images/${item.image}`" alt="" width="160" class="img-fluid" v-if="!item.image.includes(',') && !item.category">
                <div v-if="item.category && item.image.includes(',')">
                  <img :src="`/${img}`" v-for="(img, index) in item.image.split(',')" :key="img" alt="" width="160" class="img-fluid" v-show="index === 0">
                </div>
                <div v-if="!item.category && item.image.includes(',')">
                  <img :src="`/images/${img}`" v-for="(img, index) in item.image.split(',')" :key="img" alt="" width="160" class="img-fluid" v-show="index === 0">
                </div>
              </a>
              <div class="pt-2 ms-3 mt-4">
                <h3 class="product-title fs-base mb-2" v-if="item.category">{{ item.category }}</h3>
                <div class="fs-sm mt-3" v-if="item.category">
                  <span class="text-muted"><p>{{ item.content }}</p></span>
                </div>
                <div class="fs-sm mt-3" v-if="!item.category">
                  <span class="fw-bold product-title"><p>{{ item.name }}</p></span>
                </div>
                <div class="fs-lg text-accent">
                  <span class="me-2 h6"><p>{{ Number(item.price).toLocaleString() }}.<small>00</small> NGN</p></span>
                </div>
              </div>
            </div>
            <div class="pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center text-sm-start" style="max-width: 9rem;">
              <label class="form-label" for="quantity">Quantity</label>
              <input class="form-control" type="number" id="quantity" min="1" name="quantity" v-model="quantity[item._id]" @keyup="itemQuantity(item._id, index,item.price, quantity)" :key="item._id" v-if="item.category">
              <input class="form-control" type="number" id="product" min="1" name="quantity" v-model="productQuantity[item._id]" @keyup="productCount(item._id, index, item.price, quantity)" :key="item._id" v-if="!item.category">
              <button class="btn btn-link px-0 text-danger" type="button" v-if="item.category" @click="removeItem(item._id, index, item.price)">
                <img src="./bootstrap-icons-1.5.0/x-circle.svg" alt="" class="img-fluid me-2">
                <span class="fs-sm">Remove</span>
              </button>
              <button class="btn btn-link px-0 text-danger" type="button" v-if="!item.category" @click="removeProduct(item._id, index, item.price)">
                <img src="./bootstrap-icons-1.5.0/x-circle.svg" alt="" class="img-fluid me-2">
                <span class="fs-sm">Remove</span>
              </button>
            </div>
          </div>
        </section>
        <aside class="col-lg-4 pt-4 pt-lg-0 ps-xl-5">
          <div class="bg-white rounded-3 shadow-lg p-4">
            <div class="py-2 px-xl-2">
              <div class="text-center mb-4 pb-3 border-bottom" v-if="!sumTotal">
                <h2 class="h6 mb-3 pb-1">There are no items on your cart</h2>
              </div>
              <div class="text-center mb-4 pb-3 border-bottom" v-if="sumTotal">
                <h2 class="h6 mb-3 pb-1">Total</h2>
                <h3 class="fw-bold">
                  {{ Number(sumTotal).toLocaleString() }}
                </h3>
              </div>
              <div class="mb-3 mb-4" v-if="sumTotal">
              <label class="form-label mb-3" for="order-comments">
                <span class="badge bg-info fs-xs me-2">Note</span>
                <span class="fw-medium">Additional comments</span>
              </label>
              <textarea class="form-control" rows="6" id="order-comments"></textarea>
              </div>
              <div class="accordion" id="order-options" v-if="sumTotal">
              <!-- <div class="accordion-item">
                <h3 class="accordion-header">
                  <a class="accordion-button collapsed text-decoration-none" data-bs-target="#promo-code" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="promo-code">Apply promo code</a>
                </h3>
                <div class="accordion-collapse collapse" id="promo-code" data-bs-parent="#order-options" style="">
                  <form class="accordion-body needs-validation" method="post" novalidate="">
                    <div class="mb-3">
                      <input class="form-control" type="text" placeholder="Promo code" required="">
                      <div class="invalid-feedback">Please provide promo code.</div>
                    </div>
                    <button class="btn btn-outline-primary d-block w-100" type="submit">Apply promo code</button>
                  </form>
                </div>
              </div> -->
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <a class="accordion-button accord-btn text-decoration-none" data-bs-target="#shipping-estimates" role="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="shipping-estimates">
                    Shipping estimates
                  </a>
                </h3>
                <div class="accordion-collapse collapse show" id="shipping-estimates" data-bs-parent="#order-options" style="">
                  <div class="accordion-body">
                    <form class="needs-validation" novalidate="">
                      <div class="mb-3">
                        <select class="form-select" required="" name="country" v-model="country">
                          <option value="">Choose your country</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Australia">Australia</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Canada">Canada</option>
                          <option value="Finland">Finland</option>
                          <option value="Mexico">Mexico</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="United States">United States</option>
                        </select>
                        <div class="invalid-feedback">Please choose your country!</div>
                      </div>
                      <div class="mb-3">
                        <select class="form-select" required="" name="city" v-model="city">
                          <option value="">Choose your city</option>
                          <option value="Port Harcourt">Port Harcourt</option>
                          <option value="Abuja">Abuja</option>
                          <option value="Lagos">Lagos</option>
                          <option value="Bern">Bern</option>
                          <option value="Brussels">Brussels</option>
                          <option value="Canberra">Canberra</option>
                          <option value="Helsinki">Helsinki</option>
                          <option value="Mexico City">Mexico City</option>
                          <option value="Ottawa">Ottawa</option>
                          <option value="Washington D.C.">Washington D.C.</option>
                          <option value="Wellington">Wellington</option>
                        </select>
                        <div class="invalid-feedback">Please choose your city!</div>
                      </div>
                      <div class="mb-3">
                        <input class="form-control" type="text" placeholder="ZIP / Postal code" required>
                        <div class="invalid-feedback">Please provide a valid zip!</div>
                      </div>
                      <button class="btn btn-primary btn-outline-0 btn-border-0 d-block w-100 shipping text-white" type="submit">
                        <span class="h6">Calculate shipping</span>
                      </button>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-shadow btn-border-0 btn-outline-0 d-block w-100 mt-4 checkout text-white" v-if="counter" href="#" @click="checkout">
                <img src="./bootstrap-icons-1.5.0/credit-card.svg" alt="" class="img-fluid">
                <span class="ms-2 fw-bold">Proceed to Checkout</span>
              </button>
              <button class="btn btn-shadow btn-border-0 btn-outline-0 d-block w-100 mt-4 checkout text-white" v-if="!counter" disabled href="#">
                <img src="./bootstrap-icons-1.5.0/credit-card.svg" alt="" class="img-fluid">
                <span class="ms-2 fw-bold">Proceed to Checkout</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import API from '../axios'
import { getAccessToken, setAccessToken } from '../accessToken'
export default {
  data() {
    return {
      email: '',
      password: '',
      country: 'Nigeria',
      city: 'Port Harcourt',
      phone: null,
      counter: 0,
      data: [],
      products: [],
      items: [],
      productItems: [],
      total: [0],
      quantityTotal: [0],
      filter: [],
      productFilter: [],
      id: [],
      productId: [],
      sumTotal: 0,
      deductedPrice: 0,
      quantity: {},
      productQuantity: {},
      status: false,
      estimate: null,
    }
  },
  methods: {
    async itemQuantity(id, ind, price, q) {
      if(!localStorage.getItem("quantity")) {
        const balance = this.sumTotal - price
        const items = JSON.parse(localStorage.getItem("items"))
        let inputs = document.querySelectorAll("#quantity")
        var obj = {}
        let amount
        items.forEach((item, index) => {
          if (inputs[index].value != "") {
            obj[item] = parseInt(inputs[index].value)
            amount = parseInt(inputs[index].value) * price
            console.log(amount)
          } else {
            obj[item] = 1
          }
        })
        localStorage.setItem("quantity", JSON.stringify(obj))
        location.assign("/cart")
      } else {
        const quantity = JSON.parse(localStorage.getItem("quantity"))
        let inputs = document.querySelectorAll("#quantity")
        let amount
        inputs.forEach((input, index) => {
          if (input.value == "") {
            // console.log(quantity[id])
            amount = quantity[id] * price
            this.sumTotal = this.sumTotal - amount
            quantity[id] = 0
          } else {
            let itemid = quantity[id]
            // console.log(itemid)
            let p = itemid * price
            this.sumTotal = this.sumTotal - p
            quantity[id] = parseInt(input.value)
            amount = parseInt(input.value) * price
            this.sumTotal = this.sumTotal + amount
          }
        })
        localStorage.removeItem("quantity")
        localStorage.setItem("quantity", JSON.stringify(quantity))
      }
    },
    async productCount(id, ind, price, q) {
      if(!localStorage.getItem("productQuantity")) {
        const balance = this.sumTotal - price
        const items = JSON.parse(localStorage.getItem("products"))
        let inputs = document.querySelectorAll("#product")
        var obj = {}
        let amount
        items.forEach((item, index) => {
          if (inputs[index].value != "") {
            obj[item] = parseInt(inputs[index].value)
            amount = parseInt(inputs[index].value) * price
            console.log(amount)
          } else {
            obj[item] = 1
          }
        })
        localStorage.setItem("productQuantity", JSON.stringify(obj))
        location.assign("/cart")
      } else {
        const quantity = JSON.parse(localStorage.getItem("productQuantity"))
        let inputs = document.querySelectorAll("#product")
        let amount
        inputs.forEach((input, index) => {
          if (input.value == "") {
            // console.log(quantity[id])
            amount = quantity[id] * price
            this.sumTotal = this.sumTotal - amount
            quantity[id] = 0
          } else {
            let itemid = quantity[id]
            // console.log(itemid)
            let p = itemid * price
            this.sumTotal = this.sumTotal - p
            quantity[id] = parseInt(input.value)
            amount = parseInt(input.value) * price
            this.sumTotal = this.sumTotal + amount
          }
        })
        localStorage.removeItem("productQuantity")
        localStorage.setItem("productQuantity", JSON.stringify(quantity))
      }
    },
    async removeItem(id, ind, price) {
      this.items = this.items.filter((item) => item._id != id)
      // this.quantity = this.quantity.filter((quan, index) => index != ind)
      this.counter = this.items.length
      if(this.productItems.length > 0) this.counter = this.items.length + this.productItems.length
      this.items.forEach((item) => {
        this.filter.push(item._id)
      })
      localStorage.removeItem('items')
      localStorage.setItem('items', JSON.stringify(this.filter))
      const response = await API.getMaterial(id)
      let amount
      if (localStorage.getItem("quantity")) {
        const quantity = JSON.parse(localStorage.getItem("quantity"))
        amount = quantity[id] * price
        this.sumTotal = this.sumTotal - amount
        var obj = {}
        this.filter.forEach((filt) => {
          obj[filt] = quantity[filt]
        })
        localStorage.removeItem("quantity")
        localStorage.setItem("quantity", JSON.stringify(obj))
      } else {
        this.deductedPrice = response.price
        this.sumTotal = this.sumTotal - this.deductedPrice
      }
      if (this.counter === 0) {
        localStorage.removeItem("amount")
        localStorage.removeItem('items')
        localStorage.removeItem('products')
        localStorage.removeItem('location')
      }
    },
    async removeProduct(id, ind, price) {
      this.productItems = this.productItems.filter((item) => item._id != id)
      this.items = this.items.filter((item) => item._id != id)
      // this.quantity = this.quantity.filter((quan, index) => index != ind)
      this.counter = this.items.length
      if(this.items.length > 0) this.counter = this.productItems.length + this.items.length
      this.productItems.forEach((item) => {
        this.productFilter.push(item._id)
      })
      localStorage.removeItem('products')
      localStorage.setItem('products', JSON.stringify(this.productFilter))
      const response = await API.getCustomerStoreItem(id)
      let amount
      if (localStorage.getItem("productQuantity")) {
        const quantity = JSON.parse(localStorage.getItem("productQuantity"))
        amount = quantity[id] * price
        this.sumTotal = this.sumTotal - amount
        var obj = {}
        this.productFilter.forEach((filt) => {
          obj[filt] = quantity[filt]
        })
        localStorage.removeItem("productQuantity")
        localStorage.setItem("productQuantity", JSON.stringify(obj))
      } else {
        this.deductedPrice = response.result.price
        this.sumTotal = this.sumTotal - this.deductedPrice
      }
      if (this.counter === 0) {
        localStorage.removeItem("amount")
        localStorage.removeItem('items')
        localStorage.removeItem('products')
        localStorage.removeItem('location')
      }
    },
    back() {
      this.$router.go(-1)
    },
    // async signUp() {
    //   const response = await API.signUp({
    //     email: this.email,
    //     password: this.password
    //   })
    //   if (!response.errors) {
    //     console.log("yes")
    //   }
    // },
    async signIn() {
      const response = await API.signIn({
        email: this.email,
        password: this.password
      })
      if (!response.errors) {
        setAccessToken(response.token)
        const res = await axios.get(`/material/buy`, {
          headers: {
            Authorization: "Bearer " + response.token
          }
        })
        if (res.data) {
          this.$router.push({ name: 'Buy', params: { country: this.country, city: this.city }})
        }
      }
    },
    async checkout() {
      const response = await API.checkOut()
      if (!localStorage.getItem('location')) {
        let shipping = []
        shipping.push(this.country)
        shipping.push(this.city)
        localStorage.setItem('location', JSON.stringify(shipping))
      } else {
        let shipping = []
        shipping.push(this.country)
        shipping.push(this.city)
        localStorage.setItem('location', JSON.stringify(shipping))
      }
      if (response.ok == false) {
       this.$router.push({ name: 'SignIn', params:{ message: "You have to login" }})
      } else if (response.ok == true) {
        this.$router.push({ name: 'Buy', params: { country: this.country, city: this.city }})
      }
    }
  },
  created() {
    if(localStorage.getItem('items')) {
      this.counter = JSON.parse(localStorage.getItem('items')).length
      if(localStorage.getItem("products")) {
        let counter = JSON.parse(localStorage.getItem("products")).length
        this.counter = this.counter + counter
      }
      this.data = JSON.parse(localStorage.getItem('items'))
      console.log(this.data)
      this.data.forEach(async (datum) => {
        const response = await API.getMaterial(datum)
        while (this.items.indexOf(response) === -1) {
          this.items.push(response)
          this.id.push(response._id)
          this.total.push(response.price)
          localStorage.setItem('items', JSON.stringify(this.id))
        }
        if (!localStorage.getItem("quantity")) {
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.sumTotal = this.total.reduce(reducer)
        }
      })
    }
    if (localStorage.getItem("quantity")) {
      this.quantity = JSON.parse(localStorage.getItem("quantity"))
      // const total = [0]
      this.data.forEach(async datum => {
        if (this.quantity[datum] == "" || this.quantity[datum] == null || this.quantity[datum] == undefined) {
          this.quantity[datum] = 1
        }
        const response = await API.getMaterial(datum)
        const price = response.price
        const amount = this.quantity[datum] * price
        this.quantityTotal.push(amount)
        localStorage.removeItem("quantity")
        localStorage.setItem("quantity", JSON.stringify(this.quantity))
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        this.sumTotal = this.quantityTotal.reduce(reducer)
      })
      if(!localStorage.getItem("productQuantity") && localStorage.getItem("products")) {
        let items = JSON.parse(localStorage.getItem("products"))
        items.forEach(async (item) => {
          const response = await API.getCustomerStoreItem(item)
          const price = response.result.price
          this.quantityTotal.push(price)
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.sumTotal = this.quantityTotal.reduce(reducer)
        })
      }
    }
    // const phoneInputField = document.querySelector("#phone");
    // const phoneInput = window.intlTelInput(phoneInputField, {
    //   utilsScript:
    //     "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    // });
    if(localStorage.getItem("products")) {
      this.counter = JSON.parse(localStorage.getItem('products')).length
      if(localStorage.getItem("items")) {
        let counter = JSON.parse(localStorage.getItem("items")).length
        this.counter = this.counter + counter
      }
      this.products = JSON.parse(localStorage.getItem('products'))
      this.products.forEach(async (datum) => {
        const response = await API.getCustomerStoreItem(datum)
        while (this.productItems.indexOf(response.result) === -1) {
          this.productItems.push(response.result)
          this.items.push(response.result)
          this.productId.push(response.result._id)
          this.total.push(response.result.price)
          localStorage.setItem('products', JSON.stringify(this.productId))
        }
        if (!localStorage.getItem("productQuantity")) {
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.sumTotal = this.total.reduce(reducer)
        }
      })
    }
    if(localStorage.getItem("productQuantity")) {
      this.productQuantity = JSON.parse(localStorage.getItem("productQuantity"))
      // const total = [0]
      this.products.forEach(async datum => {
        if (this.productQuantity[datum] == "" || this.productQuantity[datum] == null || this.productQuantity[datum] == undefined) {
          this.productQuantity[datum] = 1
        }
        const response = await API.getCustomerStoreItem(datum)
        const price = response.result.price
        const amount = this.productQuantity[datum] * price
        this.quantityTotal.push(amount)
        localStorage.removeItem("productQuantity")
        localStorage.setItem("productQuantity", JSON.stringify(this.productQuantity))
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        this.sumTotal = this.quantityTotal.reduce(reducer)
      })
      if(!localStorage.getItem("quantity") && localStorage.getItem("items")) {
        let items = JSON.parse(localStorage.getItem("items"))
        items.forEach(async (item) => {
          const response = await API.getMaterial(item)
          const price = response.price
          this.quantityTotal.push(price)
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.sumTotal = this.quantityTotal.reduce(reducer)
        })
      }
    }
    if (this.counter === 0) {
      localStorage.removeItem('items')
      localStorage.removeItem('products')
    }
    if(!localStorage.getItem("items")) {
      localStorage.removeItem("quantity")
    }
    if(!localStorage.getItem("products")) {
      localStorage.removeItem("productQuantity")
    }
  }
}
</script>

<style scoped>
  .person {
    height: 23px;
  }
  .nav-tabs.card-header-tabs.nav-link.active {
    background-color: transparent;
    border-bottom-color: transparent;
  }
  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #fe696a;
    background-color: transparent;
    border-color: #fe696a;
  }
  .nav-tabs .nav-link {
      position: relative;
      border: 0;
  }
  .nav-link:hover, .nav-link:focus {
    color: #fe696a;
  }
  a:hover {
    color: #fe3638;
    text-decoration: none;
  }
  .accord-btn:hover {
    color: #fe3638;
    text-decoration: none;
  }
  .shipping {
    border: none;
    outline: none;
  }
  .checkout {
    background-color: #fe3638;
  }
  .btn-form {
    background-color: #fe3638;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 2px;
    border: none;
    outline: none;
  }
  .prd-btn {
    outline: 1px solid #fe3638;
    color: #fe3638;
    border: none;
  }
  textarea {
    resize: none;
  }
</style>