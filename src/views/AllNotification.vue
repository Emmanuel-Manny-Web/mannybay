<template>
  <div class="container-fluid row px-3 pt-3" v-if="results.length > 0">
    <div class="sticky-top mb-2" style="margin-right: 100px;">
      <input type="text" placeholder="Search" v-model="search" class="form-control mx-3 mb-2 d-none d-lg-block" style="width: 30%;">
      <input type="text" placeholder="Search" v-model="search" class="form-control mx-3 mb-2 d-lg-none" style="">
    </div>
    <div class="col-lg-4">
      <div v-for="(result, index) in filteredArray" :key="result._id" class="pt-3 pe-4" style="border-bottom: 1px solid lightgrey;" id="box">
        <a href="javascript:void(0)" class="text-decoration-none d-none d-lg-block" @click="anchor(result, index)">
          <p>{{ result.user }} made a purchase amounting to the sum of {{ Number(result.amount).toLocaleString() }} with reference Id {{ result.reference }} dated {{ result.createdAt }}</p>
        </a>
        <!-- <a href="javascript:void(0)" class="text-decoration-none d-lg-none">
          <p>{{ result.user }} made a purchase amounting to the sum of {{ Number(result.amount).toLocaleString() }} with reference Id {{ result.reference }} dated {{ result.createdAt }}</p>
        </a> -->
        <div class="accordion-item d-lg-none bg-none" @click="message(result, index)">
          <h2 class="accordion-header" :id="`heading-${index}`">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#result-${index}`" aria-expanded="true" :aria-controls="`result-${index}`">
              {{ result.user }} made a purchase amounting to the sum of {{ Number(result.amount).toLocaleString() }} with reference Id {{ result.reference }} dated {{ result.createdAt }}
            </button>
          </h2>
          <div :id="`result-${index}`" class="accordion-collapse collapse" :aria-labelledby="`heading-${index}`">
            <div class="accordion-body">
              <p id="message"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6 d-none d-lg-block g-4 ps-5 sticky-top" style="height: 100%;" id="div">
      <div class="text-center mb-3">
        <h6 class="h6">Orders Placed</h6>
      </div>
      <p id="paragraph"></p>
    </div>
  </div>
  <div v-else>
    <p>No order has been placed yet</p>
  </div>
</template>

<script>
import API from '../Api'
export default {
  data() {
    return {
      results: [],
      slide: [],
      currentView: null,
      view: false,
      search: ''
    }
  },
  methods: {
    async anchor(result, index) {
      const paragraph = document.querySelector("#paragraph")
      const divs = document.querySelectorAll("#box")
      if (this.slide.length > 0 && this.currentView == index && this.view) {
        paragraph.innerHTML = ''
        localStorage.removeItem("zigi")
        localStorage.removeItem("note")
        divs.forEach((div, ind) => {
          if (ind == index) {
            div.style.backgroundColor = "lightgrey";
          } else {
            div.style.backgroundColor = "white";
          }
        })
      }
      this.view = !this.view
      if (this.currentView != index || this.view) {
        this.currentView = index
        this.slide.pop()
        this.slide.push(result)
        const values = this.slide[0]
        divs.forEach((div, ind) => {
          if (ind == index) {
            div.style.backgroundColor = "lightblue";
          } else {
            div.style.backgroundColor = "white";
          }
        })

        localStorage.removeItem("zigi")
        localStorage.removeItem("note")
        let products = values.products
        localStorage.setItem("note", JSON.stringify(products))
        localStorage.setItem("zigi", JSON.stringify(result))
        let items = []
        let material = []
        let itemQuantity = []
        let email
        let emails = []
        let amount = Number(result.amount).toLocaleString()
        if(products.includes("-")) {
          let array = products.split("-")
          let posts = array[0]
          let productItems = array[1]
          if(posts.includes(',')) {
            posts = posts.split(',')
            posts.forEach(async(post) => {
              let res = await API.getItem(post)
              items.push(res)
              emails.push("mannybay")
              material.push(res.title)
              itemQuantity.push(values.quantity[post])
            })
          } else {
            let res = await API.getItem(posts)
            items.push(res)
            emails.push("mannybay")
            material.push(res.title)
            itemQuantity.push(values.quantity[posts])
          }
          if(productItems.includes(",")) {
            productItems = productItems.split(",")
            productItems.forEach(async (productItem) => {
              let res = await API.getCustomerStoreItem(productItem)
              let { userid } = res.result
              let response = await API.getClient(userid)
              email = response.email
              emails.push(email)
              items.push(res.result)
              material.push(res.result.name)
              itemQuantity.push(values.quantity[productItem])
            })
          } else {
            let res = await API.getCustomerStoreItem(productItems)
            let { userid } = res.result
            let response = await API.getClient(userid)
            email = response.email
            emails.push(email)
            items.push(res.result)
            material.push(res.result.name)
            itemQuantity.push(values.quantity[productItems])
          }
          paragraph.innerHTML = `${values.user} purchased <br><span style="letter-spacing: 1px;">${material.map((mat, index) => `<li>${itemQuantity[index]} piece(s) of ${mat} from <a class="text-primary text-decoration-none" href=/testxyz/client/${emails[index]}>${emails[index]}</a> where each quantity costs NGN ${Number(items[index].price).toLocaleString()}</li>`).join("")}</span> amounting to the sum of ${Number(values.amount).toLocaleString()} on ${values.createdAt}`
        } else {
          if (products.includes(',')) {
            let array = products.split(",")
            array.forEach(async arr => {
              let res = await API.getItem(arr)
              if(res) {
                items.push(res)
                material.push(res.title)
                emails.push("mannybay")
              } else {
                res = await API.getCustomerStoreItem(arr)
                let { userid } = res.result
                let response = await API.getClient(userid)
                emails.push(response.email)
                items.push(res.result)
                material.push(res.result.name)
              }
              // console.log(res)
              paragraph.innerHTML = `${result.user} purchased <br><span style="letter-spacing: 1px;">${material.map((mat, index) => `<li>${values.quantity[arr]} piece(s) of ${mat} from <a class="text-primary text-decoration-none" href=/testxyz/client/${emails[index]}>${emails[index]}</a> where each unit costs NGN ${Number(items[index].price).toLocaleString()}</li>`).join("")}</span>amounting to the sum of ${amount} on ${result.createdAt}`
            });
          } else if(!products.includes(',')) {
            let res = await API.getItem(products)
            if(res) {
              items.push(res)
              material.push(res.title)
              emails.push("mannybay")
            } else {
              let res = await API.getCustomerStoreItem(products)
              let { userid } = res.result
              let response = await API.getClient(userid)
              emails.push(response.email)
              items.push(res.result)
              material.push(res.result.name)
            }
            paragraph.innerHTML = `${result.user} purchased <br>1 piece of ${material[0]} from <a class="text-primary text-decoration-none" href=/testxyz/client/${emails[index]}>${emails[0]}</a><br> amounting to the sum of ${amount} on ${result.createdAt}`
          }
        }
      }
    },
    async message(result, i) {
      const paragraph = document.querySelector("#message")
      paragraph.innerHTML = ''
      const div = document.querySelectorAll('.accordion-body')
      const values = result
      // localStorage.removeItem("zigi")
      // localStorage.removeItem("note")
      let products = values.products
      // localStorage.setItem("note", JSON.stringify(products))
      // localStorage.setItem("zigi", JSON.stringify(result))
      let items = []
      let material = []
      let itemQuantity = []
      let email
      let emails = []
      let amount = Number(result.amount).toLocaleString()
      if(products.includes("-")) {
        let array = products.split("-")
        let posts = array[0]
        let productItems = array[1]
        if(posts.includes(',')) {
          posts = posts.split(',')
          posts.forEach(async(post) => {
            let res = await API.getItem(post)
            items.push(res)
            emails.push("mannybay")
            material.push(res.title)
            itemQuantity.push(values.quantity[post])
          })
        } else {
          let res = await API.getItem(posts)
          items.push(res)
          emails.push("mannybay")
          material.push(res.title)
          itemQuantity.push(values.quantity[posts])
        }
        if(productItems.includes(",")) {
          productItems = productItems.split(",")
          productItems.forEach(async (productItem) => {
            let res = await API.getCustomerStoreItem(productItem)
            let { userid } = res.result
            let response = await API.getClient(userid)
            email = response.email
            emails.push(email)
            items.push(res.result)
            material.push(res.result.name)
            itemQuantity.push(values.quantity[productItem])
          })
        } else {
          let res = await API.getCustomerStoreItem(productItems)
          let { userid } = res.result
          let response = await API.getClient(userid)
          email = response.email
          emails.push(email)
          items.push(res.result)
          material.push(res.result.name)
          itemQuantity.push(values.quantity[productItems])
        }
        paragraph.innerHTML = `${values.user} purchased <br><span style="letter-spacing: 1px;">${material.map((mat, index) => `<li>${itemQuantity[index]} piece(s) of ${mat} from <a class="text-primary text-decoration-none" href=/testxyz/client/${emails[index]}>${emails[index]}</a> where each quantity costs NGN ${Number(items[index].price).toLocaleString()}</li>`).join("")}</span> amounting to the sum of ${Number(values.amount).toLocaleString()} on ${values.createdAt}`
      } else {
        if (products.includes(',')) {
          let array = products.split(",")
          array.forEach(async arr => {
            let res = await API.getItem(arr)
            if(res) {
              items.push(res)
              material.push(res.title)
              emails.push("mannybay")
            } else {
              res = await API.getCustomerStoreItem(arr)
              let { userid } = res.result
              let response = await API.getClient(userid)
              emails.push(response.email)
              items.push(res.result)
              material.push(res.result.name)
            }
            console.log(res)
            paragraph.innerHTML = `${result.user} purchased <br><span style="letter-spacing: 1px;">${material.map((mat, index) => `<li>${values.quantity[arr]} piece(s) of ${mat} from <a class="text-primary text-decoration-none" href=/testxyz/client/${emails[index]}>${emails[index]}</a> where each unit costs NGN ${Number(items[index].price).toLocaleString()}</li>`).join("")}</span>amounting to the sum of ${amount} on ${result.createdAt}`
            div[i].appendChild(paragraph)
          });
        } else if(!products.includes(',')) {
          let res = await API.getItem(products)
          if(res) {
            items.push(res)
            material.push(res.title)
            emails.push("mannybay")
          } else {
            let res = await API.getCustomerStoreItem(products)
            let { userid } = res.result
            let response = await API.getClient(userid)
            emails.push(response.email)
            items.push(res.result)
            material.push(res.result.name)
          }
          paragraph.innerHTML = `${result.user} purchased <br>1 piece of ${material[0]} from <a class="text-primary text-decoration-none" href=/testxyz/client/${emails[0]}>${emails[0]}</a><br> amounting to the sum of ${amount} on ${result.createdAt}`
          div[i].appendChild(paragraph)
        }
      }
    }
  },
  computed: {
    filteredArray() {
      return this.results.filter((result) => {
        let lc = result.reference.toLowerCase()
        let am = parseInt(result.amount)
        let amount = am.toString()
        let prod = parseInt(result.products)
        let products = prod.toString()
        let dateded = result.createdAt.split("T")
        let dated = dateded[0]
        let date = dated.toString()
        let time = dateded
        time = dateded[1].split(".")
        time = time[0]
        let d = new Date(result.createdAt)
        let ndate = d.toUTCString()
        let newdate = ndate.toLowerCase()
        result.createdAt = ndate
        if (lc.match(this.search) || result.user.match(this.search) || result.createdAt.match(this.search) || amount.match(this.search) || products.match(this.search) || date.match(this.search) || time.match(this.search) || newdate.match(this.search)) {
          return result
        }
      })
    }
  },
  async mounted() {
    const results = await API.getNotification()
    this.results = results.results
    // const paragraph = document.querySelector("#paragraph")
    // let ls = JSON.parse(localStorage.getItem("zigi"))
    // if (localStorage.getItem("note")) {
    //   const datum = JSON.parse(localStorage.getItem("note"))
    //   let items = []
    //   let material = []
    //   let quantity = []
    //   let emails = []
    //   if(datum.includes("-")) {
    //     const data = datum.split("-")
    //     let posts = data[0]
    //     let products = data[1]
    //     if(posts.includes(",")) {
    //       posts = posts.split(",")
    //       posts.forEach(async(post) => {
    //         let res = await API.getItem(post)
    //         items.push(res)
    //         material.push(res.title)
    //         quantity.push(ls.quantity[post])
    //       })
    //     } else {
    //       let res = await API.getItem(posts)
    //       items.push(res)
    //       material.push(res.title)
    //       quantity.push(ls.quantity[posts])
    //     }
    //     if(products.includes(",")) {
    //       products = products.split(",")
    //       products.forEach(async (product) => {
    //         let res = await API.getCustomerStoreItem(product)
    //         let { userid } = res.result
    //         let { email } = await API.getClient(userid)
    //         emails.push(email)
    //         items.push(res.result)
    //         material.push(res.result.name)
    //         quantity.push(ls.quantity[product])
    //       })
    //     } else {
    //       let res = await API.getCustomerStoreItem(products)
    //       let { userid } = res.result
    //       let { email } = await API.getClient(userid)
    //       emails.push(email)
    //       items.push(res.result)
    //       material.push(res.result.name)
    //       quantity.push(ls.quantity[products])
    //     }
    //     paragraph.innerHTML = `${ls.user} purchased <br><span style="letter-spacing: 1px;">${material.map((mat, index) => `<li>${quantity[index]} piece(s) of ${mat} from <span class="text-primary">${emails[index]}</span> where each quantity costs NGN ${Number(items[index].price).toLocaleString()}</li>`).join("")}</span> amounting to the sum of ${Number(ls.amount).toLocaleString()} on ${ls.createdAt}`
    //   } else {
    //     if (datum.includes(",")) {
    //       const data = datum.split(",")
    //       data.forEach(async dat => {
    //         let res = await API.getItem(dat)
    //         if(res) {
    //           items.push(res)
    //           material.push(res.title)
    //           paragraph.innerHTML = `${ls.user} purchased <br><span style="letter-spacing: 1px;">${material.map((mat, index) => `<li>${ls.quantity[dat]} piece(s) of ${mat} where each quantity costs NGN ${Number(items[index].price).toLocaleString()}</li>`).join("")}</span> amounting to the sum of ${Number(ls.amount).toLocaleString()} on ${ls.createdAt}`
    //         } else {
    //           res = await API.getCustomerStoreItem(dat)
    //           let { userid } = res.result
    //           let { email } = await API.getClient(userid)
    //           emails.push(email)
    //           items.push(res.result)
    //           material.push(res.result.name)
    //           paragraph.innerHTML = `${ls.user} purchased <br><span style="letter-spacing: 1px;">${material.map((mat, index) => `<li>${ls.quantity[dat]} piece(s) of ${mat} from <span class="text-primary">${emails[index]}</span> where each quantity costs NGN  ${Number(items[index].price).toLocaleString()}</li>`).join("")}</span> amounting to the sum of ${Number(ls.amount).toLocaleString()} on ${ls.createdAt}`
    //         }
    //       })
    //     } else {
    //       let res = await API.getItem(datum)
    //       let userid
    //       let email
    //       if(res) {
    //         items.push(res)
    //         material.push(res.title)
    //         email = "mannybay"
    //       } else {
    //         res = await API.getCustomerStoreItem(datum)
    //         userid = res.result.userid
    //         let response = await API.getClient(userid)
    //         email = response.email
    //         items.push(res.result)
    //         material.push(res.result.name)
    //       }
    //       items.forEach(item => {
    //         let date = ls.createdAt.split("T")
    //         let day = date[0]
    //         let time = date[1].split(".")
    //         paragraph.innerHTML = `${ls.user} purchased <br>${material.map((mat) => `<li>${ls.quantity[datum]} piece(s) of ${mat} from <span class="text-primary">${email}</span></li>`)}<br> amounting to the sum of ${item.price} on ${day}, at ${time[0]}`
    //       })
    //     }
    //   }
    // }
    // let array = []
    // let divs = document.querySelectorAll("#box")
    // array = this.results
    // array.forEach((arr) => {
    //   if (ls != null) {
    //     if (arr.reference == ls.reference) {
    //       console.log(divs.length)
    //       if (divs.length > 0) {
    //         divs.forEach((div) => {
    //           const anchor = div.querySelector("a")
    //           let text = anchor.textContent
    //           if (text.includes(arr.reference)) {
    //             div.style.backgroundColor = "lightblue";
    //           }
    //         })
    //       }
    //     }
    //   }
    // })
  },
  async unmounted() {
    localStorage.removeItem("note")
    localStorage.removeItem("zigi")
  }
}
</script>

<style>

</style>