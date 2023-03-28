<template>
  <div>
    <UserNav />
    <section>
      <div class="container-lg">
        <div class="row justify-content-center align-items-center my-5">
          <div class="col-4 col-lg-3">
            <button class="btn btn-light fw-bold text-dark mb-3" style="width: 100%;">
              <!-- <img src="./bootstrap-icons-1.5.0/justify.svg" alt="" class="img-fluid me-1"> -->
              <font-awesome-icon icon="bars"  class="text-dark me-1"/>
              Menu
            </button>
          </div>
          <div class="col-4 col-lg-3">
            <button class="btn btn-light fw-bold text-dark mb-3" data-bs-toggle="collapse" data-bs-target="#search" type="button" style="width: 100%; white-space: nowrap;" @click="clickSearch">
              <font-awesome-icon icon="search"  class="text-dark me-1"/>
              <!-- <img src="./bootstrap-icons-1.5.0/search.svg" alt="" class="img-fluid me-1"> -->
              Search
            </button>
          </div>
          <div class="col-4 col-lg-3">
            <router-link :to="{ name: 'Cart' }" class="btn btn-light fw-bold text-dark mb-3" style="width: 100%;">
              <!-- <img src="./bootstrap-icons-1.5.0/cart3.svg" alt="" class="img-fluid me-1"> -->
              <font-awesome-icon icon="cart-arrow-down"  class="text-dark me-1"/>
              Cart
            </router-link>
          </div>
          <div class="collapse" id="search">
            <form action="">
              <input type="text" class="form-control" placeholder="Search" v-model="search" id="input">
            </form>
          </div>
        </div>
      </div>
    </section>
    <section class="pb-3" id="section">
      <div class="container-fluid">
        <div class="row justify-content-center align-items-center g-3" id="div">
          <div class="col-lg-3 col-md-6 col-sm-12 pb-1" v-for="(datum) in collection" :key="datum._id">
            <div class="card product-item border-0 mb-4">
              <div class="card-header product-img position-relative overflow-hidden bg-transparent border py-3 text-center" v-if="datum.image.includes(',') && datum.content">
                <img class="img-fluid" alt="" v-for="(img, index) in datum.image.split(',')" :key="img" :src="`/images/${img}`" v-show="index === 0" style="max-height: 150px;">
              </div>
              <div class="card-header product-img position-relative overflow-hidden bg-transparent border py-3 text-center" v-if="datum.image.includes(',') && !datum.content">
                <img class="img-fluid" alt="" v-for="(img, index) in datum.image.split(',')" :key="img" :src="`/images/${img}`" v-show="index === 0" style="max-height: 150px;">
              </div>
              <div class="card-header product-img position-relative overflow-hidden bg-transparent border py-3 text-center" v-if="!datum.image.includes(',') && datum.content">
                <img class="img-fluid" alt="" :src="`/images/${datum.image}`" style="max-height: 150px;">
              </div>
              <div class="card-header product-img position-relative overflow-hidden bg-transparent border py-3 text-center" v-if="!datum.image.includes(',') && !datum.content">
                <img class="img-fluid" alt="" :src="`/images/${datum.image}`" style="max-height: 150px;">
              </div>
              <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                <h6 class="text-truncate mb-3" v-if="datum.title">{{ datum.title }}</h6>
                <h6 class="text-truncate mb-3" v-if="datum.name">{{ datum.name }}</h6>
                <div class="d-flex justify-content-center">
                  <h6>NGN {{ Number(datum.price).toLocaleString() }}</h6><h6 class="text-muted ml-2">&nbsp;<del>{{ datum.price }}</del></h6>
                </div>
                <div class="d-flex justify-content-end" v-if="datum.category">
                  <small class="text-muted" style="font-size: 10px;">mannybay</small>
                </div>
                <div class="d-flex justify-content-end" v-if="!datum.category">
                  <small class="text-muted" style="font-size: 10px;">vendor</small>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between bg-light border">
                <router-link :to="{ name: 'Category', params:{ tool: datum.category, contentid: datum._id }}" class="btn btn-sm text-dark p-0" v-if="datum.category">
                  <font-awesome-icon icon="eye"  class="text-primary"/>
                  View Detail
                </router-link>
                <router-link :to="{ name: 'ProductDescription', params:{ id: datum._id }}" class="btn btn-sm text-dark p-0" v-if="!datum.category">
                  <font-awesome-icon icon="eye"  class="text-primary"/>
                  View Detail
                </router-link>
                <button href="" class="btn btn-sm text-dark p-0" @click="addToCart(datum)" v-if="!includesId.includes(datum._id)">
                  <font-awesome-icon icon="cart-plus"  class="text-primary"/>
                  Add To Cart
                </button>
                <button href="" class="btn btn-sm text-danger p-0" @click="removeFromCart(datum)" v-if="includesId.includes(datum._id)">
                  <font-awesome-icon icon="cart-plus"  class="text-danger"/>
                  Remove From Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import API from '../axios'
import UserNav from '../components/UserNav.vue'
import { ref, computed, onMounted } from "vue"
import { useRouter } from 'vue-router';

export default {
  components: { UserNav },
  setup() {
    const data = ref([]);
    const search = ref("")
    const currentSlide = ref(0)
    const router = useRouter()
    const includesId = ref([])

    const nextSlide = (images, ind) => {
      currentSlide.value += 1
      let imgs = document.querySelectorAll(".div")
      data.value.map((datum, index) => {
        if (datum.image === images) {
          let img = imgs[index].querySelectorAll(".img")
          if (currentSlide.value >= img.length - 1) {
            img[img.length - 1].style.display = "block"
            img[img.length - 1].setAttribute("class", "img-fluid")
          } else {
            img[currentSlide.value - 1].style.display = "none"
            img[currentSlide.value].style.display = "block"
          }
        }
      })
    }

    const prevSlide = (images) => {
      const image = images.split(",")
      if (currentSlide.value === 1) {
        currentSlide.value = 1
        return;
      }
      currentSlide.value -= 1
    }
    const route = (category, id) => {
      router.push({ name: 'Category', params:{ tool: category, contentid: id }})
    }
    const collection = computed(() => { 
      return data.value.filter((datum) => {
      let content = datum.content ? datum.content.toLowerCase() : '';
      let title = datum.title ? datum.title.toLowerCase() : '';
      let category = datum.category ? datum.category.toLowerCase() : '';
      let name = datum.name ? datum.name : ''
      let description = datum.description ? datum.description : ''
      search.value = search.value.toLowerCase()
      if (content.match(search.value) || title.match(search.value) || category.match(search.value) || name.match(search.value) || description.match(search.value)) {
        return datum
      }
    })})

    const addToCart = (datum) => {
      if(datum.category) {
        if(!localStorage.getItem("items")) {
          let item = []
          item.push(datum._id)
          includesId.value.push(datum._id)
          localStorage.setItem("items", JSON.stringify(item))
        } else {
          if(!localStorage.getItem("items").includes(datum._id)) {
            let item = JSON.parse(localStorage.getItem("items"))
            item.push(datum._id)
            includesId.value.push(datum._id)
            localStorage.removeItem("items")
            localStorage.setItem("items", JSON.stringify(item))
          }
        }
      } else {
        if(!localStorage.getItem("products")) {
          let item = []
          item.push(datum._id)
          includesId.value.push(datum._id)
          localStorage.setItem("products", JSON.stringify(item))
        } else {
          if(!localStorage.getItem("products").includes(datum._id)) {
            let item = JSON.parse(localStorage.getItem("products"))
            item.push(datum._id)
            includesId.value.push(datum._id)
            localStorage.removeItem("products")
            localStorage.setItem("products", JSON.stringify(item))
          }
        }
      }
    }

    const removeFromCart = (datum) => {
      if(datum.category) {
        if(localStorage.getItem("items").includes(datum._id)) {
          let items = JSON.parse(localStorage.getItem("items"))
          items = items.filter((item) => item != datum._id)
          includesId.value = includesId.value.filter((id) => id != datum._id)
          localStorage.setItem("items", JSON.stringify(items))
        }
      } else {
        if(localStorage.getItem("products").includes(datum._id)) {
          let items = JSON.parse(localStorage.getItem("products"))
          items = items.filter((item) => item != datum._id)
          includesId.value = includesId.value.filter((id) => id != datum._id)
          localStorage.setItem("products", JSON.stringify(items))
        }
      }
    }
    const clickSearch = () => {
      const input = document.querySelector("#input")
      input.focus()
    }

    onMounted(async () => {
      const response = await API.getAllPosts();
      data.value = response
      if(localStorage.getItem("items")) {
        let item = JSON.parse(localStorage.getItem("items"))
        includesId.value.push(...item)
      }
      if(localStorage.getItem("products")) {
        let item = JSON.parse(localStorage.getItem("products"))
        includesId.value.push(...item)
      }
    })
    return { data, search, currentSlide, nextSlide, prevSlide, route, collection, clickSearch, addToCart, removeFromCart, includesId }
  }
}
</script>

<style>
.carousel {
  position: relative;
}
/* .slide-info {
  position: absolute;
} */
/* .image {
  min-width: 100%;
  height: 100%;
  object-fit: cover;
} */
.navigate {
  padding: 0 16px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggle-page {
  display: flex;
  flex: 1;
}
.right {
  justify-content: flex-end;
}
.image {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: #6347c7;
  padding: 5px 5px;
  z-index: 1;
}
.pagination {
  position: relative;
  top: -15px;
  width: 100%;
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
}
.pagination span {
  cursor: pointer;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: darkgrey;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
span.active {
  background-color: #6347c7;
}
.product-item:hover .product-img img {
  transform: scale(1.2);
}
</style>