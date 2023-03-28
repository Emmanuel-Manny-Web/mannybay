<template>
  <div>
    <UserNav />
    <div class="mt-3 container px-4 text-center">
      <router-link :to="{ name: 'Cart' }" class="btn btn-border-0 btn-outline-0 btn-lg cart position-relative">
        <img src="./bootstrap-icons-1.5.0/cart4.svg"  class="img-fluid" alt="">
        <span class="position-absolute top-0 start-70 translate-middle badge rounded-pill bg-danger" v-if="counter">
          {{ counter }}
          <span class="visually-hidden">unread messages</span>
        </span>
      </router-link>
    </div>
    <section class="mt-4 pb-3">
      <div class="container-lg mt-4">
        <div class="row justify-content-center">
          <div v-if="data.image" class="row justify-content-center position-relative" style="height: 100px;">
            <img v-for="(img, index) in data.image.split(',')" :key="index" :src="`/images/${img}`" alt="" style="max-width: 100px;" v-show="currentSlide === index">
          </div>
          <!-- Navigation -->
          <div class="navigate" v-if="data.image">
            <div class="toggle-page left" @click="prevSlide(data.image)" v-if="data.image.split(',').length > 1">
              <img src="../visitor/bootstrap-icons-1.5.0/chevron-left.svg" alt="" class="img-fluid me-1 image" width="11" style="border-radius: 50%;">
            </div>
            <div class="toggle-page right" @click="nextSlide(data.image, index)" v-if="data.image.split(',').length > 1">
              <img src="../visitor/bootstrap-icons-1.5.0/chevron-right.svg" alt="" class="img-fluid me-1 image" width="11" style="border-radius: 50%;">
            </div>
          </div>
          <!-- Pagination -->
          <div class="pagination mt-4" v-if="data.image">
            <span v-for="(slide, i) in data.image.split(',')" :key="i" :class="{ active: i === currentSlide }" @click="pagination(i)"></span>
          </div>
          <!-- Pagination -->
          <h5 class="text-center fw-bol my-2">{{ data.name }}</h5>
          <div class="">
            <p class="my-3 fw-bold" v-if="data.description">Description</p>
            <ul class="mx-1" v-if="data.description">
              <li class="text-muted" v-for="name in splitDetail" :key="name"><p>{{ name }}</p></li>
            </ul>
            <div class="text-center">
              <p class="text-dark fw-bold h6">NGN {{ Number(data.price).toLocaleString() }}</p>
            </div>
          </div>
          <div class="text-end my-4 pe-3">
            <button class="btn btn-md btn-warning" @click="itemCounter(data._id)" v-if="!status">
              <img src="./bootstrap-icons-1.5.0/cart-check-fill.svg">
              <span class="fw-bold mx-2">Add To Cart</span>
            </button>
            <button class="btn btn-md btn-danger" @click="removeItem(data._id)" v-if="status">
              <img src="./bootstrap-icons-1.5.0/x-lg.svg">
              <span class="fw-bold mx-2">Remove Item</span>
            </button>
            <br><br>
            <button class="btn btn-outline-primary" @click="buyNow(data._id)">
              <img src="./bootstrap-icons-1.5.0/cart-x-fill.svg">
              <span class="fw-bold mx-2">Buy It Now</span>
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="container bg-white py-3" v-if="mapProducts.length > 1">
        <h3 class="h6 fw-bold mb-3">Similar Products</h3>
        <div>
          <div class="card card-body mb-4" v-for="product in mapProducts" :key="product._id">
            <div class="row">
              <div class="col-6" v-if="product.image.includes(',')">
                <img v-for="(img, index) in product.image.split(',')" :key="img" :src="`/${img}`" class="img-fluid" alt="" v-show="index === 0">
              </div>
              <div class="col-6" v-else>
                <img :src="`/${product.image}`" class="img-fluid" alt="">
              </div>
              <div class="col-6">
                <small class="text-muted">{{ product.content }}</small>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </section>
    <!-- footer -->
    <div class="container-fluid fixed-bottom">
      <footer class="footer">
        <div class="row bg-secondary px-2">
          <h6 class="text-white text-capitalize">hello</h6>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from '../axios'
import UserNav from '../components/UserNav.vue'
export default {
  components: { UserNav },
  data() {
    return {
      data: [],
      counter: 0,
      items: [],
      productItems: [],
      itemId: [],
      fook: [],
      status: false,
      currentSlide: 0,
      id: this.$route.params.id
    }
  },
  methods: {
    itemCounter(data) {
      if (!localStorage.getItem('products')) {
        this.counter = this.counter + 1
        this.status = true

        this.items.push(data)
        localStorage.setItem('products', JSON.stringify(this.items))
      } else {
        if (!localStorage.getItem('products').includes(data)) {
          this.items = JSON.parse(localStorage.getItem('products'))
          this.status = true

          this.items.push(data)
          localStorage.setItem('products', JSON.stringify(this.items))
          this.counter = JSON.parse(localStorage.getItem('products')).length
        }
      }
    },
    removeItem(data) {
      if (localStorage.getItem('products').includes(data)) {
        this.productItems = JSON.parse(localStorage.getItem('products'))
        this.productItems = this.productItems.filter((item) => item != data)
        if (JSON.parse(localStorage.getItem('products')).length > 1) {
          localStorage.removeItem('products')
          localStorage.setItem('products', JSON.stringify(this.productItems))
          this.status = false
          if(localStorage.getItem("items")) this.counter = JSON.parse(localStorage.getItem("items")).length + this.productItems.length
          else this.counter = JSON.parse(localStorage.getItem("products")).length
        } else {
          localStorage.removeItem('products')
          this.status = false
          if(!localStorage.getItem("items")) {
            this.counter = this.productItems.length
          } else if(localStorage.getItem("items")) {
            this.counter = JSON.parse(localStorage.getItem("items")).length + this.productItems.length
          }
        }
      }
    },
    buyNow(data) {
      if(!localStorage.products) {
        this.counter = this.counter + 1
        this.productItems.push(data)
        localStorage.setItem('products', JSON.stringify(this.productItems))
        this.status = true

        this.$router.push({ name: 'Cart' })
      } else {
        this.productItems = JSON.parse(localStorage.getItem('products')) || []

        if (!localStorage.getItem('products').includes(data)) {
          this.productItems.push(data)
          localStorage.setItem('products', JSON.stringify(this.productItems))
          this.counter = JSON.parse(localStorage.getItem('products')).length

          this.status = true
          this.$router.push({ name: 'Cart' })
        } else {
          this.$router.push({ name: 'Cart' })
        }
      }
    },
    nextSlide(images) {
      const image = images.split(",")
      if (this.currentSlide === (image.length - 1)) {
        this.currentSlide = 0
      } else {
        this.currentSlide += 1
      }
    },
    prevSlide(images) {
      const image = images.split(",")
      if (this.currentSlide === 0) {
        this.currentSlide = image.length - 1
      } else {
        this.currentSlide -= 1
      }
    },
    pagination(index) {
      this.currentSlide = index
    }
  },
  computed: {
    splitDetail() {
      return this.data.description.split(',')
    },
    // mapProducts() {
    //   return this.products.filter((product) => product._id != this.data._id)
    // },
    countInArray(array, item) {
      return array.filter((arr) => arr == item).length
    }
  },
  async mounted() {
    const response = await API.getCustomerStoreItem(this.id)
    this.data = response.result
    // this.products = response.products
    let itemLength;

    if (localStorage.getItem('products')) {
      this.counter = JSON.parse(localStorage.getItem('products')).length
      if(localStorage.getItem("items")) {
        let counter = JSON.parse(localStorage.getItem("items")).length
        this.counter = this.counter + counter
      }
      if (localStorage.getItem('products').includes(this.data._id)) {
        this.status = true
        this.items = JSON.parse(localStorage.getItem('products'))
        this.items.forEach((item) => {
          itemLength = this.items.filter((i) => i == item).length
          if (itemLength > 1) {
            if (!this.fook.includes(item)) {
              this.fook.push(item)
              this.counter = this.fook.length
              localStorage.removeItem('products')
              localStorage.setItem('products', JSON.stringify(this.fook))
            }
          }
        })

      }
    } else if (!localStorage.getItem("products")) {
      if(localStorage.getItem("items")) {
        this.counter = JSON.parse(localStorage.getItem("items")).length
      }
    }
  }
}
</script>

<style scoped>
  .cart img {
    position: relative;
    height: 35px;
  }
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
</style>