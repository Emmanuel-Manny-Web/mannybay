<template>
  <div class="container-lg">
    <div class="text-center pt-4">
      <button @click="showManageContent" class="btn btn-user btn-danger me-5">Create Content</button>
      <button @click="showUpdateContent" class="btn btn-user btn-danger">Manage Content</button>
    </div>
    <div class="row">
      <div v-if="showManage">
        <Manage :id="userid" :uploader="uploader"/>
      </div>
      <div v-if="showUpdate">
        <UpdatePost :id="userid" :uploader="uploader" :results="data"/>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../Api'
import Manage from '../components/Manage.vue'
import UpdatePost from '../components/UpdatePost.vue'

export default {
  components: { Manage, UpdatePost },
  props: ['id'],
  data() {
    return {
      data: [],
      uploader: '',
      showManage: false,
      showUpdate: true,
      userid: this.$route.params.id,
      user: {
        name: ''
      }
    }
  },
  methods: { 
    showManageContent() {
      this.showManage = !this.showManage
      this.showUpdate = false
    },
    showUpdateContent() {
      this.showUpdate = !this.showUpdate
      this.showManage = false
    }
  },
  async mounted() {
    if(!localStorage.authenticated) {
      this.$router.push({ name: 'Login' })
    }
    const result = await API.getAllPosts()
    this.data = result
  },
  async created() {
    const response = await API.getAdminById(this.userid)
    this.uploader = response.useruid
  }
}
</script>

<style scoped>
/* @media(max-width: 700px) {
  .container {
    padding: 0 15px;
    white-space: nowrap;
  }
  .container .child {
    text-align: center;
  }
  button {
    position: relative;
    background: crimson;
    border: none;
    margin-top: 20px;
    white-space: nowrap;
    margin-right: 20px;
    padding: 10px 20px;
    color: white;
    text-overflow: inherit;
    overflow: visible;
    width: auto;
    box-sizing: border-box;
    border-radius: 5px;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .submit {
    text-align: center;
  }  
}
.container {
  padding: 0 15px;
}
.container .child {
  text-align: center;
}
button {
  background: crimson;
  border: none;
  margin-top: 20px;
  white-space: nowrap;
  margin-right: 20px;
  color: white;
  text-overflow: inherit;
  padding: 10px 20px;
  overflow: visible;
  width: auto;
  box-sizing: border-box;
  border-radius: 5px;
  letter-spacing: 1px;
  cursor: pointer;
}
.submit {
  text-align: center;
} */
</style>