<template>
  <form method="POST" @submit.prevent="createPost" enctype="multipart/form-data">
    <label>Title: </label>
    <input type="text" name="title" v-model="title">
    <label>Category: </label>
    <select v-model="category" name="category">
      <option value="Bolts">Bolts</option>
      <option value="Valve">Valves</option>
      <option value="Flange">Flanges</option>
    </select>
    <label>Image: </label>
    <input type="file" @change="selectFile" name="image" multiple accept="image/*" id="image">
    <label>Content: </label>
    <textarea draggable="false" name="content" v-model="content"></textarea>
    <label>Details</label>
    <textarea draggable="false" name="detail" v-model="detail"></textarea>
    <label>Price</label>
    <input type="text" name="price" v-model="price" required>
    <label>Quantity</label>
    <input type="text" name="quantity" v-model="quantity" required>
    <input type="text" v-show="false" name="uploader" v-model="uploader">
    <div class="submit">
      <button>POST</button>
    </div>
  </form>
</template>

<script>
import API from '../Api'
export default {
  props: ['id','uploader'],
  data() {
    return {
      title: '',
      category: 'Bolts',
      image: [],
      content: '',
      detail: '',
      price: '',
      quantity: '',
      imgvalue: '',
      img: ''
    }
  },
  methods: {
    selectFile(event) {
      this.image = event.target.files
    },
    async createPost() {
      const formData = new FormData()
      formData.append("title", this.title)
      formData.append("category", this.category)
      formData.append("content", this.content)
      formData.append("detail", this.detail)
      formData.append("price", this.price)
      formData.append("quantity", this.quantity)
      formData.append("uploader", this.uploader)
      for (const i of Object.keys(this.image)) {
        formData.append("image", this.image[i])
      }
      const response = await API.createPost(this.id, formData)
      this.$router.push({ name: 'Master', params:{ message: 'Post created successfully!' }})
    }
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
  display: inline-block;
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
  width: 50%;
  letter-spacing: 2px;
  cursor: pointer;
}
.submit {
  text-align: center;
}
</style>