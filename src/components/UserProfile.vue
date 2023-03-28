<template>
  <div>
    <!-- <div class="sticky-top text-end" style="position: fixed; margin-right: 10px; background-color: white; top: 0px; right: 10px; top: 14px; z-index: 2;">
      <div id="searchBar" class="d-none d-lg-block">
        <input type="text" name="" placeholder="Search">
        <font-awesome-icon icon="search"  class="text-secondary" />
      </div>
      <div id="searchBar bar-sm" class="d-lg-none">
        <input type="text" name="" placeholder="Search" v-show="bar" :class="{ bar: bar }" style="outline: none; border: none;">
        <font-awesome-icon icon="search"  class="text-secondary" @click="bar = !bar"/>
      </div>
    </div> -->
    <OffCanvas />
    <section v-if="!manage" class="mt-2">
      <div class="container-fluid">
        <div class="text-center mb-3">
          <p class="fw-bold text-capitalize">My profile</p>
        </div>
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col g-3" v-for="(card, index) in cards" :key="index">
              <a :href="card.id" class="text-decoration-none fw-light">
                <div class="card" style="height: 230px;">
                  <div class="card-body">
                    <p class="card-title text-center fw-bold">{{ card.title }}</p>
                    <p class="card-subtitle text-center">{{ card.subtitle }}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="">
          <div class="container mt-3" id="profit">
            <Profit :data="data" />
          </div>
          <div class="container mt-3" id="rejected">
            <Rejected />
          </div>
          <div class="container mt-3" id="charges">
            <Charges />
          </div>
          <div class="container mt-3" id="txn">
            <Transactions :data="data" :items="items" />
          </div>
          <div class="container mt-3" id="review">
            <Review />
          </div>
        </div> 
      </div>
    </section>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue"
import Profit from '../components/profilecardcomp/UserProfit.vue'
import Rejected from '../components/profilecardcomp/Rejected.vue'
import Charges from '../components/profilecardcomp/UserCharges.vue'
import Transactions from '../components/profilecardcomp/UserTransactions.vue'
import Review from '../components/profilecardcomp/UserReview.vue'
import OffCanvas from '../components/ProfileOffCanvas.vue'
import API from '../axios'
import { useRouter } from 'vue-router'
export default {
  components: { Profit, Rejected, Charges, Transactions, Review, OffCanvas },
  setup() {
    const title = ref('Dashboard')
    const createStore = ref(false)
    const manage = ref(false)
    const cards = ref([{title: 'Profit', subtitle: 'Total amount made after deduction of charges.', id: '#profit'}, {title: 'Rejected & Returned', subtitle: 'Items that were rejected and returned.', id: '#rejected'}, {title: 'Charged services', subtitle: 'Charges incurred from your services.', id: '#charges'}, {title: 'Transactions', subtitle: 'This includes all transactions and progress made.', id: '#txn'}, {title: 'Customer reviews', subtitle: 'Comments made from customers.', id: '#review'}])
    const items = ref([])
    const data = ref({})
    const bar = ref(false)
    const showBar = () => {
      const bar = document.getElementById("bar-sm")
    }

    const changeManage = () => {
      manage.value = !manage.value
    }
    const showDashboard = () => {
      manage.value = false
    }

    const createAccount = () => {
      createStore.value = true
    }
    onBeforeMount(async () => {
      const result = await API.customerAnalytics()
      result.items.forEach((item) => {
        Object.keys(item).forEach(async (key) => {
          let i = await API.getCustomerStoreItem(key)
          if(i !== null || i !== undefined) {
            items.value.push(i.result)
          } else {
            let i = await API.getMaterial(key)
            items.value.push(i)
          }
        })
      })
      Object.keys(result).forEach((key) => {
        if(key !== "items") {
          data.value[key] = result[key]
        }
      })
    })
    return { title, createAccount, createStore, manage, changeManage, cards, showDashboard, items, data, showBar, bar }
  }
}
</script>

<style scoped>
  #searchBar {
    background: #fff;
    height: 30px;
    border-radius: 30px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    transition: 0.8s;
  }
  #searchBar input {
    background: transparent;
    border: none;
    outline: none;
    width: 0px;
    font-weight: 500;
    font-size: 16px;
    transition: 0.8s;
    position: relative;
    top: 10px;
  }
  .bar {
    width: 150px;
    height: 20px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 16px;
    background: transparent;
    font-weight: 500;
    transition: 0.8s;
  }
  @media(min-width: 700px) {
    #searchBar:hover input {
      width: 350px;
      cursor: pointer;
      position: relative;
      top: 10px;
    }
  }
</style>