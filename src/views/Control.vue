<template>
  <form method="POST" @submit="createPost" enctype="multipart/form-data">
    <label>Title: </label>
    <input type="text" name="title" v-model="title">
    <label>Category: </label>
    <select v-model="category" name="category">
      <option value="Bolts">Bolts</option>
      <option value="Valve">Valves</option>
      <option value="Flange">Flanges</option>
    </select>
    <label>Image: </label>
    <input type="file" @change="selectFile" name="file" multiple id="image">
    <label>Content: </label>
    <textarea draggable="false" name="content" v-model="content"></textarea>
    <input type="text" v-show="false" name="uploader" v-model="uploader">
    <div class="submit">
      <button>POST</button>
    </div>
  </form>
</template>

<script>
import API from '../Api'
export default {
  props: ['id'],
  // components: { SelectTag },
  data() {
    return {
      title: '',
      category: '',
      image: '',
      content: '',
      imgvalue: '',
      img: '',
      uploader: ''
    }
  },
  methods: {
    selectFile(file) {
      this.img = document.getElementById("image").value
      this.imgvalue = this.img.split("C:\\fakepath\\");
      this.image = this.imgvalue[1]
      console.log(this.image)
    },
    async createPost() {
      const response = await API.createPost(this.id, {
        title: this.title,
        category: this.category,
        image: this.image,
        content: this.content,
        uploader: this.uploader,
      })
      if (!response.errors) {
        this.$router.push({ name: 'Post', params:{ message: 'Post created successfully!' }})
      }
    }
  },
  async mounted() {
    await API.getAdminById(this.id)
      .then((data) => this.uploader = data.admin_uid)
      .catch(err => console.log(err))
      console.log(this.uploader)
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
a {
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