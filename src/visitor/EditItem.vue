<template>
  <div class="py-3">
    <div class="d-flex">
      <OffCanvas />
    </div>
    <div v-if="showSpinner" :class="{ active: showSpinner === true }" class="text-center">
      <div class="d-flex text-center blur">
        <MDBSpinner color="info" />
        <p class="text-white text-center fw-bold h5 ms-3">Please wait ...</p>
      </div>
    </div>
    <div v-if="resError">
      <p class="fw-bold text-muted h6 text-center mt-3">{{ resError }}</p>
    </div>
    <div class="container" v-if="!resError">
      <form enctype="multipart/form-data" @submit.prevent="updateItem">
        <div id="edit-image">
          <label for="image" class="mt-3"><p>Edit pictures</p></label>
          <div class="card border-none outline-none mb-3" id="div">
            <div class="card-body p-1">
              <div class="text-center">
                  <input type="file" name="image" multiple id="file" @change="upload" accept="image/*">
                  <label for="file" class="text-muted h6" style="white-space: nowrap;">
                    <i class="fa fa-image"></i> &nbsp;
                    Add photos
                  </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col" v-for="(image, index) in imgArray" :key="index">
              <img :src="`/images/${image}`" alt="" class="img-fluid" style="width: 100px; height: 50px;">
              <div style="width: 100px" class="text-center">
                <button class="btn btn-link px-0 text-danger text-decoration-none text-center" type="button" @click="removeImg(image)">
                  <span class="fs-sm fw-bold">x</span>
                </button>
              </div>
            </div>
            <div v-if="added">
              <p class="fw-bold text-center">New Images</p>
              <div class="row">
                <div class="col" v-for="(img, i) in images" :key="i">
                  <img :src="`${img}`" alt="" class="img-fluid" style="width: 100px; height: 50px;">
                </div>
              </div>
            </div>
          </div>
          <p class="text-danger">{{ errors.image }}</p>
        </div>
        <div class="form-group mt-3">
          <label for="productname"><p>Name of item: </p></label>
          <input type="text" name="name" class="form-control" id="productname" v-model="details.name">
          <p class="text-danger">{{ errors.name }}</p>
        </div>
        <div class="form-group mt-3">
          <label for="description"><p>Description</p></label>
          <textarea name="description" id="description" cols="30" rows="5" class="form-control" v-model="details.description"></textarea>
          <p class="text-danger">{{ errors.description }}</p>
        </div>
        <div class="form-group mt-3">
          <label for="price"><p>Price.. <small class="fw-light text-muted">should be in naira</small></p></label>
          <input type="number" id="price" class="form-control" name="price" v-model="details.price">
          <p class="text-danger">{{ errors.price }}</p>
        </div>
        <div class="form-group mt-3">
          <label for="quantity">
            <p>Quantity Available</p>
          </label>
          <input type="number" id="quantity" class="form-control" name="quantity" v-model="details.quantity" @keyup="errors.quantity = ''">
          <p class="text-danger fw-bold">{{ errors.quantity }}</p>
        </div>
        <div class="form-group mt-3">
          <label for="promocode">
            <p id="promocode">Promo code.. (optional)</p>
            <small class="text-muted">Your customers can use this to get discounts on items</small>
          </label>
          <input type="text" name="promocode" placeholder="" class="form-control my-2" v-model="details.promocode">
          <label for="discount">
            <p id="discount">Discount rate(%)</p>
            <small class="text-muted">Customers will buy this item at the given percentage discount when they use promo code</small>
          </label>
          <input type="number" class="form-control my-2" name="discount" v-model="disrate">
        </div>
        <div class="form-group mt-3">
          <div class="text-start my-3"><p class="fw-bold">Delivery & Fulfillment Price</p></div>
          <p>Your products are fulfilled by <span class="fw-bolder">{{ fulfillmentType }}</span></p>
          <div>
            <div class="mb-2" v-if="fulfillmentType === 'Self'">
              <small class="text-muted">This means you're in charge of customer service and delivery of this item to buyers</small>
            </div>
            <div class="mb-2" v-if="fulfillmentType === 'Manny'">
              <small class="text-muted">This means MannyBay is in charge of customer service and delivery of this item to buyers</small>
            </div>
            <p class="text-success fw-bold" @click="changeFulfillment" style="cursor: pointer;"><span class="fw-bolder">+</span>&nbsp; Change fulfillment type</p>
          </div>
          <p class="text-danger">{{ errors.fulfillment }}</p>
          <div v-if="fulfillmentChange">
            <a class="btn btn-success border-none" @click="fulfillValue(setFulfillment)">
               Change to <span class="fw-bold">{{ setFulfillment }}</span>
              </a>
          </div>
          <div v-if="deliveryType == 'all'">
            <AllDelivery :location="location" />
          </div>
          <div v-if="deliveryType == 'ph'">
            <PhDelivery :location="location" />
          </div>
          <div v-if="deliveryType == 'few'" class="mt-3">
            <FewDelivery @changeBasis="basisSet" :location="location" :regions="geoZones" @amountSet="setAmount" @setZone="zoneSet" :regionzone="zone" :zoneAmount="zoneAmount" :states="states" :error="error" />
          </div>
          <p class="text-success fw-bold mt-2" @click="changeDelivery" style="cursor: pointer;"><span class="fw-bolder">+</span>&nbsp; Change delivery type</p>
          <p class="text-danger">{{ errors.delivery }}</p>
          <div v-if="setDelivery">
            <div class="form-check form-check-inline" v-for="(type, index) in filterDeliveryType" :key="index">
              <input type="radio" name="deliveryType" :id="type" class="form-check-input" :value="type" @click="setUpdateDelivery(type)">
              <label :for="type" class="form-check-label"><p>{{ objDeliveryType[type] }}</p></label>
            </div>
          </div>
          <div class="row mt-3" v-if="updatedDelivery == 'ph'">
            <div class="col-6">
              <input type="text" class="form-control" readonly id="ph" placeholder="Port Harcourt" value="Port Harcourt">
            </div>
            <div class="col-6">
              <input type="number" class="form-control" placeholder="Amount" name="ph" v-model="objPh.amount">
            </div>
          </div>
          <div class="form-group" v-if="updatedDelivery == 'all'">
            <p class="text-start fw-bold mt-3">Set your delivery price based on regions</p>
            <div class="row g-3">
              <div class="col-6">
                <input type="text" class="form-control" placeholder="South-South" readonly name="ss">
              </div>
              <div class="col-6">
                <input type="number" class="form-control" placeholder="Amount" name="southsouth" v-model="objAll.ss">
              </div>
              <div class="col-6">
                <input type="text" class="form-control" placeholder="South-West" readonly name="sw">
              </div>
              <div class="col-6">
                <input type="number" class="form-control" placeholder="Amount" name="southwest" v-model="objAll.sw">
              </div>
              <div class="col-6">
                <input type="text" class="form-control" placeholder="South-East" readonly name="se">
              </div>
              <div class="col-6">
                <input type="number" class="form-control" placeholder="Amount" name="southeast" v-model="objAll.se">
              </div>
              <div class="col-6">
                <input type="text" class="form-control" placeholder="North-Central" readonly name="nc">
              </div>
              <div class="col-6">
                <input type="number" class="form-control" placeholder="Amount" name="northcentral" v-model="objAll.nc">
              </div>
              <div class="col-6">
                <input type="text" class="form-control" placeholder="North-East" readonly name="ne">
              </div>
              <div class="col-6">
                <input type="number" class="form-control" placeholder="Amount" name="northeast" v-model="objAll.ne">
              </div>
              <div class="col-6">
                <input type="text" class="form-control" placeholder="North-West" readonly name="nw">
              </div>
              <div class="col-6">
                <input type="number" class="form-control" placeholder="Amount" name="northwest" v-model="objAll.nw">
              </div>
            </div>
          </div>
          <div v-if="updatedDelivery == 'few'">
            <div class="text-start">
              <p class="fw-bold">Choose the basis on which you will deliver</p>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" name="regional" id="regional" class="form-check-input" value="regional" @click="setBasis('regional')">
              <label for="regional" class="form-check-label"><p>Based on geo-political zone</p></label>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" name="regional" id="states" class="form-check-input" value="states" @click="setBasis('states')">
              <label for="states" class="form-check-label"><p>Based on your chosen <span class="fw-bolder">STATES</span>.. (5 at most)</p></label>
            </div>
            <div v-if="basis == 'regional'">
              <div class="text-start">
                <p class="fw-bold">Choose one geo-political zone</p>
              </div>
              <div class="form-check form-check-inline" v-for="(zone, index) in geoZones" :key="index">
                <input class="form-check-input" type="radio" name="zone" :id="zone" @click="showAmount(zone)">
                <label :for="zone" class="form-check-label"><p>{{ cap(zone) }}</p></label>
              </div>
              <div v-show="set">
                <input type="number" name="amount" id="" class="form-control" placeholder="Amount" v-model="zoneAmount">
              </div>
            </div>
            <div v-if="basis == 'states'">
              <div class="row" v-for="(states, i) in objFewStates" :key="i">
                <div class="col-6">
                  <input type="text" class="form-control mb-3" name="states" v-model="objFewStates[i].state" placeholder="States">
                </div>
                <div class="col-6">
                  <input type="number" class="form-control" placeholder="Amount" name="stateAmount" v-model="objFewStates[i].amount">
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-danger">{{ error }}</p>
        <div class="form-group mt-4 text-center">
          <button class="btn btn-success fw-bold border-none">UPDATE</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import OffCanvas from '../components/ProfileOffCanvas.vue'
import AllDelivery from '../components/deliveries/AllDelivery.vue'
import PhDelivery from '../components/PhDelivery.vue'
import FewDelivery from '../components/deliveries/FewDelivery.vue'
import API from "../axios"
import { MDBSpinner } from "mdb-vue-ui-kit"
export default {
  components: { OffCanvas, AllDelivery, FewDelivery, PhDelivery, MDBSpinner },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const showSpinner = ref(false)
    const id = route.params.id
    const details = ref([])
    const disrate = ref()
    const oldImage = ref("")
    const imgArray = ref([])
    const fulfillmentType = ref('')
    const fulfillment = ref(['Manny', 'Self'])
    const fulfillmentChange = ref(false)
    const setFulfillment = ref('')
    const deliveryType = ref('')
    const updatedDelivery = ref('')
    const basis = ref('')
    const ogBasis = ref('')
    const image = ref([])
    const images = ref([])
    const location = ref({})
    const setDelivery = ref(false)
    const set = ref(false)
    const added = ref(false)
    const zone = ref('')
    const zoneAmount = ref()
    const objDeliveryType = ref({
      "ph": "Change to Port Harcourt only",
      "all": "Change to all states in Nigeria",
      "few": "Change to few selected states"
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
    const objFewRegional = ref({
      basis: 'regional',
      region: '',
      amount: null
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
    const states = ref({
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
      },
      basis: 'states'
    })
    const geoZones = ref(['south-south', 'south-west', 'south-east', 'north-central', 'north-west', 'north-east'])
    const errors = ref({
      image: '',
      name: '',
      description: '',
      price: '',
      fulfillment: '',
      delivery: '',
      quantity: ''
    })
    const error = ref('')
    const resError = ref('')

    const changeDelivery = () => {
      setDelivery.value = !setDelivery.value
      updatedDelivery.value = ''
    }
    const setUpdateDelivery = (val) => {
      updatedDelivery.value = val
    }
    const upload = (event) => {
      added.value = true
      image.value = event.target.files
      for (let i = 0; i < image.value.length; i++) {
        const url = URL.createObjectURL(image.value[i]);
        images.value.push(url)
      }
    }
    const removeImg = (val) => {
      imgArray.value = imgArray.value.filter((img) => img != val)
      oldImage.value = oldImage.value.split(",").filter(img => img !== val)
      oldImage.value = oldImage.value.toString()
    }
    const setBasis = (val) => {
      basis.value = val
      if(basis.value == 'states') {
        set.value = false
      }
    }
    const basisSet = (val) => {
      error.value = ''
      basis.value = val
    }
    const zoneSet = (val) => {
      zone.value = val
      // location.value['region'] = val
    }
    const showAmount = (val) => {
      set.value = true
      objFewRegional.value['region'] = val
    }
    const setAmount = (val) => {
      zoneAmount.value = val
      // location.value['amount'] = val
    }
    const cap = (val) => {
      let value = val.split('-')
      let first = value[0].charAt(0).toUpperCase() + value[0].slice(1).toLowerCase()
      let second = value[1].charAt(0).toUpperCase() + value[1].slice(1).toLowerCase()
      let word = first + "-" + second
      return word
    }
    const filterDeliveryType = computed(() => {
      return Object.keys(objDeliveryType.value).filter((element) => element !== deliveryType.value)
    })

    const changeFulfillment = () => {
      fulfillmentChange.value = !fulfillmentChange.value
    }
    const fulfillValue = (val) => {
      fulfillmentType.value = val
      fulfillment.value.forEach((fulfill) => {
        if(fulfill != fulfillmentType.value) {
          setFulfillment.value = fulfill
        }
      })
    }
    const updateItem = async () => {
      showSpinner.value = true
      errors.value['image'] = imgArray.value.length > 0 || image.value.length > 0 ? '' : 'Select an image to upload';
      errors.value['name'] = details.value['name'].length > 3 ? '' : 'Name must be at least 3 chars long';
      errors.value['description'] = details.value['description'].length > 10 ? '' : 'Description must be at least 10 chars long'
      errors.value['price'] = details.value['price'] > 0 ? '' : 'Please input a price'
      errors.value['fulfillment'] = fulfillmentType.value ? '' : 'Choose a fulfillment plan'
      errors.value['delivery'] = deliveryType.value !== '' ? '' : 'Choose a delivery option'
      errors.value['quantity'] = details.value['quantity'] > 0 ? '' : 'Quantity must be greater than zero'
      
      if (Object.keys(errors.value).every(key => errors.value[key] == '')) {
        const formData = new FormData()
        formData.append("name", details.value.name)
        formData.append("description", details.value.description)
        formData.append("price", details.value.price)
        formData.append("promocode", details.value.promocode)
        formData.append("discountrate", details.value.discountrate)
        formData.append("quantity", details.value.quantity)
        formData.append("userid", details.value.userid)
        formData.append("fulfillmentType", fulfillmentType.value)
        if(image.value.length > 0) {
          if(oldImage.value !== '') {
            formData.append("old_image", oldImage.value)
          }
          for(const i of Object.keys(image.value)) {
            formData.append("image", image.value[i])
          }
        } else {
          formData.append("old_image", oldImage.value)
        }
        if (updatedDelivery.value) {
          formData.append("deliveryType", updatedDelivery.value)
        } else {
          formData.append("deliveryType", deliveryType.value)
        }
        if(updatedDelivery.value == "all") {
          if(Object.values(objAll.value).every((element) => element !== '')) {
            formData.append("location", JSON.stringify(objAll.value))
          } else {
            error.value = 'Fill in all required fields'
          }
        }
        if(updatedDelivery.value == "ph") {
          if(objPh.value['state'] !== '' && objPh.value['amount'] !== null && objPh.value['amount'] !== 0 && objPh.value['amount'] !== '' && objPh.value['state'] == 'Port Harcourt') {
            formData.append("location", JSON.stringify(objPh.value))
          } else {
            error.value = 'Fill in all required fields'
          }
        }
        if(updatedDelivery.value == "few") {
          if(basis.value == 'regional') {
            objFewRegional.value['amount'] = zoneAmount.value
            if(Object.values(objFewRegional.value).every(element => element !== '' && element !== null)) {
              formData.append("location", JSON.stringify(objFewRegional.value))
            } else {
              error.value = 'Fill in all required fields'
            }
          } else if (basis.value == 'states') {
            if (Object.keys(objFewStates.value).every(element => objFewStates.value[element].state == '' && objFewStates.value[element].amount == null)) {
              error.value = 'Fill in all required fields'
            } else {
              objFewStates.value['basis'] = 'states'
              formData.append("location", JSON.stringify(objFewStates.value))
            }
          }
        }
        if(updatedDelivery.value == '') {
          if (deliveryType.value == 'few') {
            if(basis.value == 'states') {
              if(ogBasis.value == 'states') {
                const array = Object.keys(location.value).filter(element => element !== 'basis')
                const bool = array.every(element => location.value[element].state == '' && location.value[element].amount == null)
                if(bool) {
                  error.value = 'Fill in all required fields'
                } else {
                  formData.append("location", JSON.stringify(location.value))
                }
              } else {
                const array = Object.keys(states.value).filter(element => element !== 'basis')
                const bool = array.every(element => states.value[element].state == '' && states.value[element].amount == null)
                if(bool) {
                  error.value = 'Fill in all required fields'
                } else {
                  formData.append("location", JSON.stringify(states.value))
                }
              }
            } else if(basis.value == 'regional') {
              if(zone.value !== '' && zoneAmount.value !== '') {
                const object = ref({})
                object.value = {
                  basis: 'regional',
                  region: zone.value,
                  amount: zoneAmount.value
                }
                formData.append("location", JSON.stringify(object.value))
              } else {
                error.value = 'Fill in all required fields'
              }
            }
          }
          if(deliveryType.value == 'all') {
            if(Object.keys(location.value).every(element => location.value[element] !== '')) {
              formData.append("location", JSON.stringify(location.value))
            }
          }
          if(deliveryType.value == 'ph') {
            if(Object.keys(location.value).every(key => location.value[key] !== '' && location.value[key] !== null)) {
              formData.append("location", JSON.stringify(location.value))
            }
          }
        }
        if(!error.value && Object.keys(errors.value).every(key => errors.value[key] == '')) {
          const res = await API.updateItem(id, formData)
          if(res.ok) {
            showSpinner.value = false
            router.push({name: 'StoreItems', params: { message: `Your item with id: ${id} and name: ${details.value.name} has been updated.` }})
          }
        }
      }
    }

    onBeforeMount(async() => {
      const res = await API.editItem(id)
      if(res.ok !== false) {
        details.value = res.details
        oldImage.value = details.value.image
        imgArray.value = details.value.image.split(',')
        fulfillmentType.value = details.value.delivery.fulfillmentType
        deliveryType.value = details.value.delivery.delivery.deliveryType
        location.value = JSON.parse(details.value.delivery.delivery.location)
        disrate.value = details.value.discountrate == "null" ? '' : details.value.discountrate
        zone.value = location.value['region'] ? location.value['region'] : ''
        if(zone.value) {
          zoneAmount.value = location.value['amount'] ? location.value['amount'] : ''
        }
        basis.value = location.value['basis']
        ogBasis.value = location.value['basis']
        fulfillment.value.forEach((fulfill) => {
          if(fulfill != fulfillmentType.value) {
            setFulfillment.value = fulfill
          }
        })
      } else {
        resError.value = 'This item does not exist or must have been deleted'
      }
    })

    return { details, imgArray, fulfillmentType, deliveryType, disrate, location, changeDelivery, setDelivery, objDeliveryType, filterDeliveryType, updatedDelivery, setUpdateDelivery, geoZones, setBasis, basis, cap, set, showAmount, objFewStates, updateItem, upload, images, added, removeImg, setFulfillment, changeFulfillment, fulfillmentChange, fulfillValue, setAmount, basisSet, zoneSet, zone, zoneAmount, states, objAll, objPh, errors, error, resError, showSpinner }
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