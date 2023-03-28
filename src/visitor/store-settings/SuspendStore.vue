<template>
  <div class="ps-3 py-3">
    <div class="container">
      <div>
        <p class="fw-bold">Why do you want to deactivate your store?</p>
      </div>
      <div class="form-group mt-3" v-for="(action, index) in actions" :key="index">
        <div class="card" v-if="action.reason !== 'others'">
          <div class="card-body">
            <div class="form-check">
              <input type="radio" name="reason" :id="action.reason" :value="action.reason" class="form-check-input" @click="setReason(action)">
              <label :for="action.reason" class="form-check-label" @click="setReason(action)">
                <p class="fw-bold">{{ action.motive }}</p>
              </label>
            </div>
          </div>
        </div>
        <div class="card" v-else>
          <div class="card-body">
            <div class="form-check">
              <input type="radio" name="reason" :id="action.reason" :value="action.reason" class="form-check-input" @click="setShow(action.reason)">
              <label :for="action.reason" class="form-check-label" @click="setShow(action.reason)">
                <p class="fw-bold">{{ action.motive }}</p>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div v-if="show" class="mt-3">
        <textarea name="motive" id="" cols="30" rows="5" class="form-control" placeholder="What are your reasons for deactivating your store?..." v-model="cause.excuse" style="resize: none;"></textarea>
      </div>
      <div class="mt-3" v-if="showDuration">
        <p class="fw-bold">Set a duration period</p>
        <div class="form-check form-check-inline" v-for="(duration, index) in durations" :key="index">
          <input type="radio" name="period" :id="index" :value="duration" class="form-check-input" v-model="period">
          <label :for="index" class="form-check-label">
            <p class="fw-bold">{{ duration }} days</p>
          </label>
        </div>
      </div>
      <div>
        <p class="fw-bold text-danger">{{ error }}</p>
      </div>
      <div class="mt-3 text-center">
        <button class="btn btn-primary btn-lg text-white" data-bs-toggle="modal" data-bs-target="#suspend-modal" id="modal-trigger" @click="proceed" :disabled="disableButton"><span class="lead">Proceed</span></button>
      </div>
      <div class="modal fade" id="suspend-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="fw-bold">Are you sure you want to deactivate your store?</p>
              <div class="row align-items-center justify-content-center text-center">
                <div class="col-6">
                  <button class="btn btn-lg btn-danger" data-bs-dismiss="modal">No</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-lg btn-success" data-bs-dismiss="modal" @click="update">Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overlay text-center px-3" v-if="loading">
        <div class="card" style="top: 35%;">
          <div class="card-body">
            <p class="card-title fw-bold text-dark">
              Please wait while we process your request, after request is successful, you will be redirected to the homepage
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import API from '../../axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const actions = ref([
      { reason: "unavailable", motive: "Currently unavailable to sell products" },
      { reason: "low stocks", motive: "Unable to currently meet demands as supply is low" },
      { reason: "others", motive: "Others" }
    ])
    const durations = ref([1, 14, 30, 60, 90])
    const cause = ref({ reason: "", excuse: "" })
    const error = ref('')
    const show = ref(false)
    const showDuration = ref(false)
    const disableButton = ref(true)
    const loading = ref(false)
    const period = ref()
    const router = useRouter()

    const setReason = (val) => {
      error.value = ''
      cause.value['reason'] = val['reason']
      cause.value['excuse'] = val['motive']
      show.value = false
    }
    const setShow = (val) => {
      error.value = ''
      cause.value['reason'] = val
      cause.value['excuse'] = ""
      show.value = true
      disableButton.value = true
      showDuration.value = false
    }
    const proceed = () => {
      error.value = cause.value['excuse'].length < 30 ? 'Reason for suspension must be at least 10 chars long' : ''
    }
    const update = () => {
      error.value = cause.value['excuse'].length < 30 ? 'Reason for suspension must be at least 10 chars long' : ''
      loading.value = true
      Date.prototype.addDays = function(days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getUTCDate() + days)
        return date;
      }
      if(!error.value && Object.keys(cause.value).every(key => cause.value[key] !== '') && period.value) {
        const startDate = new Date()
        const date = new Date()
        const endDate = date.addDays(period.value)
        setTimeout(async () => {
          const res = await API.suspendAccount({ 
            motive: cause.value,
            startDate,
            endDate,
            period: period.value
          })
          if(res.ok) {
            await API.logout()
            .then(() => router.push({ name: 'Home' }))
            .catch(() => {
              loading.value = false
              error.value = 'Error processing request'
            })
          } else {
            loading.value = false
            error.value = res.error
          }
        }, 5000)
      }
    }
    watchEffect(() => {
      if(Object.keys(cause.value).every(key => cause.value[key] !== '')) {
        if(cause.value['excuse'].length > 30) {
          showDuration.value = true
          if(period.value) {
            disableButton.value = false
          }
        } else {
          disableButton.value = true
        }
      }
    })
    return { actions, show, setShow, error, setReason, proceed, disableButton, cause, loading, update, durations, period, showDuration }
  }
}
</script>

<style>
  textarea {
    resize: none;
  }
  .overlay {
      position: fixed; /* Sit on top of the page content */
      /*display: none;  Hidden by default */
      width: 100%; /* Full width (cover the whole page) */
      height: 100%; /* Full height (cover the whole page) */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5); /* Black background with opacity */
      z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
      cursor: pointer; /* Add a pointer on hover */
      
    }
</style>