<template>
  <div>
    <form method="POST" @submit.prevent="updatePost" enctype="multipart/form-data">
      <label>Title: </label>
      <input type="text" name="title" v-model="post.title">
      <label>Category: </label>
      <select v-model="post.category" name="category">
        <option value="Bolts">Bolts</option>
        <option value="Valve">Valves</option>
        <option value="Flange">Flanges</option >
      </select>
      <label>Image: </label>
      <input type="file" @change="selectFile" name="image" id="image" multiple>
      <img :src="`/${image}`" width="120" v-if="!image.includes(',')">
      <img v-for="img in imgArr" :key="img" :src="`/${img}`" width="120" v-else>
      <label>Content: </label>
      <textarea draggable="false" name="content" v-model="post.content"></textarea>
      <label>Details: </label>
      <textarea draggable="false" name="detail" v-model="post.detail"></textarea>
      <label>Price</label>
      <input type="text" name="price" v-model="post.price" required>
      <label>Quantity</label>
      <input type="text" name="quantity" v-model="post.quantity" required>
      <input type="text" v-show="false" name="uploader" v-model="post.uploader">
      <input type="text" v-show="false" name="old_image" v-model="post.old_image">
      <div class="submit">
        <button>UPDATE</button>
      </div>
    </form>
  </div>
</template>

<script>
import API from '../Api'
export default {
  props: ['id','contentid'],
  data() {
    return {
      post: {
        title: "",
        category: "",
        content: "",
        detail: "",
        price: "",
        quantity:  "",
        uploader: "",
        image: "",
        old_image: ""
      },
      img: [],
      imgValue: "",
      image: "",
      imgArr: []
    }
  },
  methods: {
    selectFile(event) {
      this.img = event.target.files
      if (!this.img) {
        this.post.image = this.image
      }
    },
    async updatePost() {
      const formData = new FormData()
      formData.append("title", this.post.title)
      formData.append("category", this.post.category)
      formData.append("content", this.post.content)
      formData.append("detail", this.post.detail)
      formData.append("price", this.post.price)
      formData.append("quantity", this.post.quantity)
      formData.append("uploader", this.post.uploader)
      formData.append("old_image", this.post.old_image)
      if (this.img != '') {
        for (const i of Object.keys(this.img[i])) {
          formData.append("image", this.img[i])
        }
      } else {
        formData.append("image", this.image)
      }
      await API.updatePost(this.id, this.contentid, formData)
    }
  },
  async mounted() {
    if(!localStorage.authenticated) {
      this.$router.push({ name: 'Login' })
    }
    const result = await API.getPost(this.id, this.contentid)
    this.post = result.result
    this.image = result.result.image
    if (this.image.includes(',')) {
      let imgarray = this.image.split(',')
      this.imgArr = imgarray
    }
    this.post.old_image = result.result.image
  }
}
</script>

<style scoped>
form {
  max-width: 50vw;
  margin: 0 auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: block;
  margin: 25px 0 15px;
  font-family: sans-serif;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input, select, textarea {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 2px;
  color: #555;
  resize: none;
}
button {
  background: #0b6dff;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  width: auto;
  letter-spacing: 2px;
  cursor: pointer;
}
.submit {
  text-align: center;
}
</style>