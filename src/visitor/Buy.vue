<template>
  <div class="container ps-3 pt-3 pb-3">
    <div v-for="item in items" :key="item._id" class="text-center mb-3 border-bottom pb-3">
      <p class="leading fw-bold" v-if="item.title">{{ item.title }}</p>
      <p class="leading fw-bold" v-if="!item.title">{{ item.name }}</p>
      <img :src="`/${item.image}`" alt="" width="160" class="img-fluid mt-3" v-if="!item.image.includes(',') && item.title">
      <img :src="`/images/${item.image}`" alt="" width="160" class="img-fluid mt-3" v-if="!item.image.includes(',') && !item.title">
      <div v-if="item.title && item.image.includes(',')">
        <img :src="`/${img}`" v-for="(img, index) in item.image.split(',')" :key="index" alt="" width="160" class="img-fluid mt-3" v-show="index == 0">
      </div>
      <div v-if="!item.title && item.image.includes(',')">
        <img :src="`/images/${img}`" v-for="(img, index) in item.image.split(',')" :key="index" alt="" width="160" class="img-fluid mt-3" v-show="index == 0">
      </div>
      <p class="mt-3 h4">{{ item.category }}</p>
      <p class="mt-3 h6 fw-bold">{{ Number(item.price).toLocaleString() }}</p>
      <h6 class="mt-4" v-if="item.category">Quantity: <span class="ms-1">{{ quantity[item._id] }}</span></h6>
      <h6 class="mt-4" v-if="!item.category">Quantity: <span class="ms-1">{{ productQuantity[item._id] }}</span></h6>
    </div>
    <div class="text-center mt-5">
      <h6>Sum Total</h6>
      <p class="fw-bold h6 my-3">NGN {{ Number(sumTotal).toLocaleString() }}.00</p>
      <div style="margin-bottom: 10px; display: block;" class="row">
        <p><span>Your delivery address is :</span></p>
        <textarea name="" id="" v-model="location" class="col-lg-4 col-9"></textarea><br>
        <button type="submit" class="btn btn-secondary btn-border-0 col-9 col-lg-3 my-3" @click="getLocation">
          Use device current location
        </button>
      </div>
      <div v-show="show" class="show">

      </div>
      <paystack
        buttonClass="'button-class btn btn-primary btn-border-0'"
        :buttonText="`Pay ${ sumTotal }`"
        :publicKey="publicKey"
        :email="email"
        :amount="parseInt(sumTotal * 100)"
        :reference="reference"
        :onSuccess="onSuccessfulPayment"
        :onCanel="onCancelledPayment">
      </paystack>
    </div>
  </div>
</template>

<script>
import API from '../axios'
import paystack from "vue3-paystack"
import { getAccessToken } from "../accessToken"

export default {
  components: { paystack },
  data() {
    return {
      counter: 0,
      data: [],
      products: [],
      items: [],
      total: [],
      quantity: {},
      productQuantity: {},
      sumTotal: 0,
      publicKey: "pk_test_c4ab7deee13e985efef6e7103a46080275cc47ac",
      email: "",
      referenceId: "",
      location: "",
      show: false
    }
  },
  methods: {
    async onSuccessfulPayment() {
      let posts = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : ''
      let products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : ''
      let purchase
      if(posts) posts = posts.toString()
      if(products) products = products.toString()
      if(posts && products) purchase = posts + "-" + products
      if(posts && !products) purchase = { posts }
      if(!posts && products) purchase = { products }
      const res = await API.createOrder({
        reference: this.referenceId,
        user: this.email,
        products: purchase,
        quantity: this.quantity,
        amount: this.sumTotal,
        country: this.country,
        city: this.city
      })
      if (res.message) {
        localStorage.removeItem("items")
        localStorage.removeItem("products")
        localStorage.removeItem("quantity")
        localStorage.removeItem("productQuantity")
        localStorage.removeItem('location')
        this.$router.push({ name: "Cart", params: { message: res.message }})
      } else {
        this.$router.push({ name: "Cart", params: { error: res.error }})
      }
    },
    onCancelledPayment() {
      this.$router.push({ name: "Cart" })
      console.log("cancelled")
    },
    getLocation() {
      var div = document.querySelector(".show");
      if (navigator.geolocation) {
        this.show = true
        navigator.geolocation.getCurrentPosition(this.showPosition, console.log);
      } else {
        div.innerHTML = "The Browser Does not Support Geolocation";
      }
    },
    showPosition(position) {
      var div = document.querySelector(".show");
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      // You need to enter your API Key here
      var api_key = "";
      var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x300&sensor=false&key=${api_key}`;
      div.innerHTML = `<img src='${img_url}'>`;
    }
  },
  computed: {
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        this.referenceId = text
      return text;
    }
  },
  async created() {
    if(localStorage.getItem('items')) {
      this.counter = JSON.parse(localStorage.getItem('items')).length;
      if(localStorage.getItem("products")) this.counter = JSON.parse(localStorage.getItem("products")).length + this.counter
      this.data = JSON.parse(localStorage.getItem('items'));
      this.data.forEach(async (datum) => {
        const response = await API.getMaterial(datum)
        while (this.items.indexOf(response) === -1) {
          this.items.push(response)
        }
        if (!localStorage.getItem("quantity")) {
          this.quantity[datum] = 1
          this.total.push(response.price)
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.sumTotal = this.total.reduce(reducer)
        }
        if (localStorage.getItem("quantity")) {
          this.quantity = JSON.parse(localStorage.getItem("quantity"))
          const amount = this.quantity[datum] * response.price
          this.total.push(amount)
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.sumTotal = this.total.reduce(reducer)
        }
      })
    }
    if(localStorage.getItem("products")) {
      if(!localStorage.getItem("items")) this.counter = JSON.parse(localStorage.getItem("products")).length
      this.products = JSON.parse(localStorage.getItem("products"))
      this.products.forEach(async (datum) => {
        const response = await API.getCustomerStoreItem(datum)
        while (this.items.indexOf(response.result) === -1) {
          this.items.push(response.result)
        }
        if (!localStorage.getItem("productQuantity")) {
          this.productQuantity[datum] = 1
          this.quantity[datum] = 1
          this.total.push(response.result.price)
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.sumTotal = this.total.reduce(reducer)
        }
        if (localStorage.getItem("productQuantity")) {
          this.productQuantity = JSON.parse(localStorage.getItem("productQuantity"))
          for(const i in this.productQuantity) {
            this.quantity[i] = this.productQuantity[i]
          }
          const amount = this.productQuantity[datum] * response.result.price
          this.total.push(amount)
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.sumTotal = this.total.reduce(reducer)
        }
      })
    }
    const res = await API.getUser()
    this.email = res.user.email
    this.location = res.user.location
    if (localStorage.getItem('location')) {
      let items = []
      items = JSON.parse(localStorage.getItem('location'))
      this.country = items[0]
      this.city = items[1]
    }
  }
}
</script>

<style scoped>
.checkout {
  background-color: #fe3638;
}
textarea {
  border: 1px solid grey;
  border-radius: 2%;
  resize: none;
  padding: 5px 10px;
  font-family: sans-serif;
}
</style>