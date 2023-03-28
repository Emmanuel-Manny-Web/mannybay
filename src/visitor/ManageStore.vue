<template>
  <div class="py-3">
    <div class="d-flex">
      <OffCanvas />
      <div class="container-fluid text-end pt-1">
        <router-link :to="{ name: 'StoreItems' }" class="btn btn-sm border-none fw-bolder text-muted" style="white-space: nowrap">Edit listed items</router-link>
        <router-link :to="{ name: 'StoreSetting' }" class="btn btn-sm border-none fw-bolder text-muted" style="white-space: nowrap">
          Store settings
        </router-link>
      </div>
      <div v-if="showSpinner" :class="{ active: showSpinner === true }" class="text-center">
      <div class="d-flex text-center blur">
        <MDBSpinner color="info" />
        <p class="text-white text-center fw-bold h5 ms-3">Please wait ...</p>
      </div>
    </div>
    </div>
    <div class="px-3">
      <div class="text-center">
        <p>List item for sale</p>
      </div>
      <div class="container">
        <p class="fw-bolder text-muted">Select pictures</p>
        <form action="" enctype="multipart/form-data">
          <div class="row justify-content-start align-items-center">
            <div class="col">
              <div class="card border-none outline-none" id="div">
                <div class="card-body p-1">
                  <div class="text-center">
                      <input type="file" name="image" multiple id="file" @change="upload" accept="image/*">
                      <label for="file" class="text-muted h6" style="white-space: nowrap;">
                        <i class="fa fa-image"></i> &nbsp;
                        Choose photos
                      </label>
                  </div>
                </div>
              </div>
              <p class="fw-bold text-danger" v-if="imageError">{{ imageError }}</p>
            </div>
            <div class="mt-3" v-if="images.length > 0">
              <div class="row">
                <div v-for="(img, index) in images" :key="index" class="col" @click="removeImg(img)">
                  <img :src="`${img}`" alt="" class="img-fluid" style="width: 100px; height: 50px;">
                </div>
              </div>
            </div>
          </div>
          <div class="my-4">
            <div class="form-group">
              <label for="productname"><p>Name of item: </p></label>
              <input type="text" name="name" class="form-control" id="productname" v-model="obj.name" @keyup="nameError = ''">
              <p class="name-error text-danger fw-bold">{{ nameError }}</p>
            </div>
            <div class="form-group mt-3">
              <label for="description"><p>Description</p></label>
              <textarea name="description" id="description" cols="30" rows="5" class="form-control" v-model="obj.description" @keyup="descriptionError = ''"></textarea>
              <p class="text-danger fw-bold">{{ descriptionError }}</p>
            </div>
            <label for="category" class="mt-2"><p>Your category is: </p></label>
            <div class="row justify-content-start align-items-center">
              <div class="col col-lg-2 rounded-pill border border-info pt-3 me-2" v-for="(item, index) in category" :key="index">
                <p class="text-center" style="white-space: nowrap;">{{ item }}</p>
              </div>
            </div>
            <div class="form-group mt-3">
              <label for="price"><p>Price.. <small class="fw-light text-muted">should be in naira</small></p></label>
              <input type="number" id="price" class="form-control" name="price" v-model="obj.price" @keyup="priceError = ''">
              <p class="text-danger fw-bold">{{ priceError }}</p>
            </div>
            <div class="form-group mt-3">
              <label for="quantity">
                <p>Quantity Available</p>
                <input type="number" id="quantity" class="form-control" name="quantity" v-model="obj.quantity" @keyup="quantityError = ''">
              <p class="text-danger fw-bold">{{ quantityError }}</p>
              </label>
            </div>
            <div class="form-group mt-3">
              <label for="promocode">
                <p id="promocode">Promo code.. (optional)</p>
                <small class="text-muted">Your customers can use this to get discounts on items</small>
              </label>
              <input type="text" name="promocode" placeholder="" class="form-control my-2" v-model="obj.promocode">
              <label for="discount">
                <p id="discount">Discount rate(%)</p>
                <small class="text-muted">Customers will buy this item at the given percentage discount when they use promo code</small>
              </label>
              <input type="number" class="form-control my-2" name="discount" v-model="obj.discountrate">
            </div>
            <div class="form-group mt-3" v-if="fulfillment === 'Self'">
              <div class="text-start my-3"><p class="fw-bold">Delivery & Fulfillment Price</p></div>
              <label for="fulfillment">
                <p>Your products are fulfilled by <span class="fw-bolder">{{ fulfillment }}</span></p>
                <small class="text-muted">This means you're in charge of customer service and delivery of this item to </small>
              </label>
              <select name="deliveryprice" id="fulfillment" class="form-control mt-2 text-muted" v-model="delivery" @click="error = ''">
                <option value="all">All states in Nigeria</option>
                <option value="ph">Port Harcourt only</option>
                <option value="few">Choose states to deliver to & provide customer service</option>
              </select>
              <p class="text-danger">{{ deliveryError }}</p>
              <div v-if="delivery == 'all'">
                <AllDelivery :objAll="objAll" />
              </div>
              <div v-if="delivery == 'ph'">
                <PHDelivery :objPh="objPh" />
              </div>
              <div v-if="delivery == 'few'" class="mt-3">
                <FewDeliveries @changeBasis="setBasis" :regions="regions" @setZone="zoneSet" @amountSet="setAmount" :objFewStates="objFewStates" />
              </div>
            </div>
            <p class="fw-bold text-danger mt-2" v-if="error">{{ error }}</p>
            <div>
              <a class="btn btn-sm btn-success mt-3" @click="listItem">List Item for sale</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import API from "../axios"
import OffCanvas from '../components/ProfileOffCanvas.vue'
import AllDelivery from './deliveries/AllDelivery.vue'
import PHDelivery from './deliveries/PhDelivery.vue'
import FewDeliveries from './deliveries/FewDeliveries.vue'
import { useRouter } from 'vue-router'
import { MDBSpinner } from "mdb-vue-ui-kit"
export default {
  components: { OffCanvas, AllDelivery, PHDelivery, FewDeliveries, MDBSpinner },
  setup() {
    const userStore = ref()
    const router = useRouter()
    const delivery = ref('all')
    const showSpinner = ref(false)
    const obj = ref({
      name: '',
      description: '',
      price: '',
      promocode: '',
      discountrate: null,
      quantity: 1
    })
    const objAll = ref({
      state: 'All',
      ss: '',
      sw: '',
      se: '',
      nc: '',
      nw: '',
      ne: ''
    })
    const objPh = ref({
      state: 'Port Harcourt',
      amount: null
    })
    const objFewRegional = ref({
      basis: 'regional',
      region: '',
      amount: null
    })
    const objFewStates = ref({
      first: {
        state: '',
        amount: null
      },
      second: {
        state: '',
        amount: null
      },
      third: {
        state: '',
        amount: null
      },
      fourth: {
        state: '',
        amount: null
      },
      fifth: {
        state: '',
        amount: null
      }
    })
    const id = ref('')
    const fulfillment = ref()
    const category = ref()
    const images = ref([])
    const image = ref([])
    const basis = ref('')
    const zone = ref('')
    const regions = ref(['south-south', 'south-west', 'south-east', 'north-central', 'north-east', 'north-west'])
    const nameError = ref('')
    const descriptionError = ref('')
    const priceError = ref('')
    const deliveryError = ref('')
    const imageError = ref('')
    const quantityError = ref('')
    const error = ref('')
    const setBasis = (value) => {
      basis.value = value
    }
    const zoneSet = (val) => {
      zone.value = val
      objFewRegional.value['region'] = zone.value
    }
    const setAmount = (val) => {
      objFewRegional.value.amount = val
    }
    const upload = (event) => {
      imageError.value = ''
      image.value = event.target.files
      for (let i = 0; i < image.value.length; i++) {
        const url = URL.createObjectURL(image.value[i]);
        images.value.push(url)
      }
    }

    const removeImg = (img) => {
      images.value = images.value.filter((image) => image !== img)
    }

    const capitalize = (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()

    const listItem = async () => {
      showSpinner.value = true
      nameError.value = obj.value.name.length > 3 ? '' : 'Name must be at least 3 chars long'
      descriptionError.value = obj.value.description.length > 10 ? '' : 'Description must be at least 10 chars long'
      priceError.value = obj.value.price > 0 ? '' : 'Please input a price'
      deliveryError.value = delivery.value != '' ? '' : 'Choose a delivery option'
      imageError.value = image.value.length > 0 ? '' : 'You must select an image'
      quantityError.value = obj.value.quantity > 0 && obj.value.quantity !== null && obj.value.quantity !== '' ? '' : 'Quantity must be greater than zero'
      error.value = ''
      
      if(!nameError.value && !descriptionError.value && !priceError.value && !deliveryError.value && !imageError.value && !quantityError.value) {
        const formData = new FormData()
        for(const i of Object.keys(image.value)) {
          formData.append("image", image.value[i])
        }
        formData.append("name", obj.value.name)
        formData.append("description", obj.value.description)
        formData.append("price", obj.value.price)
        formData.append("promocode", obj.value.promocode)
        formData.append("discountrate", obj.value.discountrate)
        formData.append("quantity", obj.value.quantity)
        formData.append("fulfillmentType", fulfillment.value)
        formData.append("userid", id.value)
        if(fulfillment.value === 'self' || fulfillment.value == 'Self') {
          formData.append("deliveryType", delivery.value)
          if(delivery.value == 'ph') {
            if(objPh.value.state !== '' && objPh.value.amount !== null && objPh.value.amount !== 0 && objPh.value.amount !== '' && objPh.value.state == 'Port Harcourt') {
              formData.append("location", JSON.stringify(objPh.value))
            } else {
              error.value = 'Fill in all required fields'
            }
          }
          if(delivery.value == 'all') {
            if(Object.values(objAll.value).every((element) => element !== '')) {
              formData.append("location", JSON.stringify(objAll.value))
            } else {
              error.value = 'Fill in all required fields'
            }
          }
          if(delivery.value == 'few') {
            if(basis.value == 'regional') {
              if(Object.keys(objFewRegional.value).every((element) => objFewRegional.value[element] !== null)) {
                objFewRegional.value['basis'] = 'regional'
                formData.append("location", JSON.stringify(objFewRegional.value))
              } else {
                error.value = 'Fill in all required fields'
              }
            } else if (basis.value == 'states') {
              const array = Object.keys(objFewStates.value).every(element => objFewStates.value[element].state == '' && objFewStates.value[element].amount == null)
              if(array) {
                error.value = 'Fill in the required fields'
              } else {
                objFewStates.value['basis'] = 'states'
                formData.append("location", JSON.stringify(objFewStates.value))
              }
            }
          }
        }
        if(!error.value) {
          const res = await API.listItem(formData)
          if(res.ok) {
            showSpinner.value = false
            router.push({ name: 'StoreItems' })
          }
        }
      }
    }
    onBeforeMount(async() => {
      const res = await API.getUserStore()
      userStore.value = res.store
      fulfillment.value = capitalize(res.store.fulfillment)
      category.value = res.store.categories.split(',')
      const response = await API.getUser()
      id.value = response.user.userid
    })

    return { upload, images, userStore, fulfillment, delivery, category, basis, regions, removeImg, listItem, obj, objAll, objPh, zone, objFewRegional, objFewStates, nameError, descriptionError, priceError, deliveryError, setBasis, zoneSet, setAmount, imageError, error, quantityError, showSpinner }
  }
}
</script>

<style scoped>
  input[type='file'] {
    display: none;
  }
  label {
    cursor: pointer;
  }
  textarea {
    resize: none;
  }
  .active {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 150%;
    height: 100%;
    z-index: 2;
  }
  .blur {
    position: absolute;
    top: 50%;
    left: 20%;
  }
  @media(min-width: 700px) {
    .blur {
      position: absolute;
      top: 50%;
      left: 30%;
    }
  }
</style>