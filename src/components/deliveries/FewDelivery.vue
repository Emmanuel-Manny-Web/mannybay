<template>
  <div>
    <div class="text-start">
      <p class="fw-bold">Choose the basis on which you will deliver</p>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" name="regional" id="regional" class="form-check-input" value="regional" @click="setBasis('regional')" v-model="basis">
      <label for="regional" class="form-check-label" style="cursor: pointer;"><p>Based on geo-political zone</p></label>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" name="regional" id="states" class="form-check-input" value="states" @click="setBasis('states')" v-model="basis">
      <label for="states" class="form-check-label" style="cursor: pointer;"><p>Based on your chosen <span class="fw-bolder">STATES</span>.. (5 at most)</p></label>
    </div>
    <div v-if="basis == 'regional'">
      <div class="text-start">
        <p class="">Choose one geo-political zone</p>
      </div>
      <div class="form-check form-check-inline" v-for="(region, index) in regions" :key="index">
        <input class="form-check-input" type="radio" name="zone" :id="region" :value="region" @click="showAmountInput(region)" v-model="regionzone">
        <label :for="region" class="form-check-label" style="cursor: pointer;"><p>{{ cap(region) }}</p></label>
      </div>
      <div v-if="set">
        <input type="number" name="amount" id="" class="form-control" placeholder="Amount" v-model="amount" @keyup="setAmount">
      </div>
    </div>
    <div v-if="basis == 'states'">
      <div class="row" v-for="(c, i) in objFewStates" :key="i">
        <div v-if="ogBasis == ''" class="row">
          <div class="col-6">
            <input type="text" class="form-control mb-3" name="states" v-model="states[c].state">
          </div>
          <div class="col-6">
            <input type="number" class="form-control" placeholder="Amount" name="stateAmount" v-model="states[c].amount">
          </div>
        </div>
        <div v-else-if="ogBasis == 'states'" class="row">
          <div class="col-6">
            <input type="text" class="form-control mb-3" name="states" v-model="location[c].state">
          </div>
          <div class="col-6">
            <input type="number" class="form-control" placeholder="Amount" name="stateAmount" v-model="location[c].amount">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from "vue"
export default {
  props: ['regions', 'location', 'regionzone', 'zoneAmount', 'states', 'error'],
  setup(props, { emit }) {
    const basis = ref('')
    const zone = ref('')
    const ogBasis = ref('')
    const amount = ref(null)
    const set = ref(false)
    const setBasis = (val) => {
      if(val == 'regional') {
        set.value = true
      } else {
        set.value = false
      }
      emit('changeBasis', basis.value = val)
    }
    const cap = (val) => {
      let value = val.split('-')
      let first = value[0].charAt(0).toUpperCase() + value[0].slice(1).toLowerCase()
      let second = value[1].charAt(0).toUpperCase() + value[1].slice(1).toLowerCase()
      let word = first + "-" + second
      return word
    }
    const objFewStates = computed(() => {
      if(ogBasis.value == 'states') {
        return Object.keys(props.location).filter(element => element !== 'basis')
      } else {
        if(basis.value == 'states') {
          return Object.keys(props.states).filter(element => element !== 'basis')
        }
      }
    })
    const showAmountInput = (value) => {
      props.error.value = ''
      set.value = true
      emit('setZone', zone.value = value)
      console.log(set.value)
    }
    const setAmount = () => {
      emit('amountSet', amount.value)
    }
    onBeforeMount(async() => {
      basis.value = props.location.basis
      amount.value = props.zoneAmount
      if(props.location.basis == 'regional') {
        set.value = true
      } else {
        ogBasis.value = props.location.basis
      }
    })
    return { setBasis, cap, showAmountInput, basis, set, zone, setAmount, amount, objFewStates, ogBasis }
  }
}
</script>

<style>
 #regional, #states {
   cursor: pointer;
 }
</style>