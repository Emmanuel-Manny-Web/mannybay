<template>
  <div v-if="filteredResult.length > 0" class="">
    <div v-for="result in filteredResult" :key="result._id" class="container-lg">
      <div class="row justify-content-center align-items-center mt-4">
        <p class="">{{ result.category }}</p>
        <div>
          <router-link :to="{ name: 'PostEdit', params: { contentid: result._id }}" class="btn btn-primary btn-user me-5 text-decoration-none" @click="showEditForm">Edit</router-link>
          <button class="button delete btn btn-danger btn-user" @click="deletePost(id, result._id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <div class="child">
      <p class="nopost">There is no post on the website.</p>
    </div>
  </div>
</template>

<script>
import API from "../Api";
export default {
  props: ['id','uploader','results'],
  data() {
    return {
      showForm: false,
      data: []
    }
  },
  methods: {
    showEditForm() {
      this.showForm = !this.showForm
    },
    async deletePost(userid, postid) {
      await API.deletePost(userid, postid)
      .then((response) => this.$router.push({ name: "Master", params: {message: response.message }}))
      .catch(err => console.log(err))
    }
  },
  computed: {
    filteredResult() {
      return this.results.filter((result) => result.category)
    }
  }
}
</script>

<style scoped>
/* .container {
  white-space: nowrap;
  margin-top: 40px;
  padding: 40px;
}
.child {
  width: 50vw;
  display: flex;
  white-space: nowrap;
  margin-bottom: 15px;
}
p {
  font-family: Avenir, sans-serif, Arial, Helvetica;
  text-transform: capitalize;
  font-weight: bold;
  color: grey;
}
.nopost {
  font-family: Avenir, sans-serif, Arial, Helvetica;
  text-transform: initial;
  font-weight: bold;
  color: grey;
}
.child span {
  max-width: 100px;
  white-space: nowrap;
  margin-right: 10px;
}
.child div {
  position: absolute;
  margin-top: 15px;
  left: 50%;
}
.button {
  margin-right: 20px;
  font-size: 0.9em;
  font-family: sans-serif;
  font-weight: bold;
  border: none;
  outline: none;
  white-space: nowrap;
  background: none;
  width: auto;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
}
.edit {
  color: green;
}
.delete {
  color: crimson;
}
@media(max-width: 700px) {
  .container {
    width: 90%;
    margin-top: 40px;
  }
  .child {
    display: flex;
    max-width: 100%;
    margin-left: 5vw;
    margin-bottom: 15px;
    white-space: nowrap;
  }
  p {
    font-family: Avenir, sans-serif, Arial, Helvetica;
    text-transform: capitalize;
    font-weight: bold;
    color: grey;
  }
  .child span {
    max-width: 100px;
    white-space: nowrap;
    margin-right: 10px;
  }
  .child div {
    position: absolute;
    margin-top: 15px;
    left: 50%;
  }
  .button {
    margin-right: 20px;
    font-size: 0.9em;
    font-family: sans-serif;
    font-weight: bold;
    border: none;
    outline: none;
    white-space: nowrap;
    background: none;
    width: auto;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .edit {
    color: green;
  }
  .delete {
    color: crimson;
  }
} */
</style>