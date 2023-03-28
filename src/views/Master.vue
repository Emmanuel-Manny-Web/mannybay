<template>
  <div v-if="data.length > 1">
		<Nav v-if="user"/>
    <div v-for="datum in data" :key="datum._id" class="data">
      <div v-if="$route.params.message">
        {{ $route.params.message }}
      </div>
      <div class="wrap"><p>{{ datum.useruid }}</p></div>
			<div class="links">
				<router-link :to="{name: 'Update', params: { id: datum._id }}">Edit Admin</router-link>
				<router-link :to="{name: 'Post', params: { id: datum._id }}">Manage Content</router-link>
				<router-link :to="{name: 'Create', params: { id: datum._id }}" v-if="datum.useruid == 'emmanuel'">Create Admin</router-link>
				<button v-if="datum.useruid != 'emmanuel'" @click="deleteAdmin(datum._id)" class="delete">Delete Admin</button>
			</div>
    </div>
		<FootNav />
  </div>
  <div v-else>
		<Nav v-if="user"/>
    <div v-if="$route.params.message" :class="{ alert: showUpdate}" >
			<div v-if="showUpdate" @click="showAlert">
				{{ $route.params.message }}
			</div>
    </div>
		<div class="data">
			<div class="wrap"><p>{{ data.useruid }}</p></div>
			<div class="links">
				<router-link :to="{name: 'Update', params: { id: id }}">Edit Admin</router-link>
				<router-link :to="{name: 'Post', params: { id: id }}">Manage Content</router-link>
				<button v-if="data.useruid != 'emmanuel'" @click="deleteAdmin(id)" class="delete">Delete Admin</button>
				<router-link :to="{name: 'Create', params: { id: id }}" v-if="data.useruid == 'emmanuel'">Create Admin</router-link>
			</div>
		</div>
		<FootNav />
  </div>
</template>

<script>
import API from '../Api'
import Nav from '../components/Nav.vue'
import FootNav from '../components/FootNav'
import { mapState, mapGetters } from 'vuex'
export default {
	components: { Nav, FootNav },
  data() {
    return {
      data: [],
      showUpdate: true,
	  	id: this.$route.params.id,
	  	user: ''
    }
  },
  methods: {
    showAlert() {
      this.showUpdate = !this.showUpdate
			this.$router.push({ name: "Master" })
    },
		async deleteAdmin(userid) {
			await API.deleteAdmin(userid)
			.then(() => {
				this.$router.push({ name: 'Login' })
			})
		}
  },
  async created() {
		if(!localStorage.authenticated) {
			this.$router.push({ name: 'Login' })
		} else {
			this.data = await API.getAdminById(this.id)
			this.user = localStorage.authenticated
			if(this.data.useruid === 'emmanuel') {
				const res = await API.getAllAdmin()
				if(res.length > 1) {
					this.data = res
				}
			}
		}
  },
	computed: {
		...mapState(['authenticated'])
	}
}
</script>

<!--<style scoped>
@media(min-width: 700px) {
	.data {
		display: flex;
		padding: 30px 10px 10px 10px;
		max-width: 400px;
		border-radius: 5px;
		margin-top: 20px;
		margin-left: 20px;
		white-space: nowrap;
	}
	.wrap {
		max-width: 100px;
		white-space: nowrap;
		text-transform: capitalize;
		margin-right: 100px;
	}
	.links {
		width: 50%;
		position: absolute;
		left: 200px;
	}
	.data p {
		font-family: sans-serif;
		padding-right: 30px;
		font-size: 1em;
		text-transform: capitalize;
		font-weight: bold;
		letter-spacing: 1px;
	}
	.data a {
		padding: 15px;
		margin: 0 10px 0 10px;
		background: crimson;
		font-family: sans-serif;
		white-space: nowrap;
		font-size: 0.9em;
		width: 50%;
		cursor: pointer;
		text-decoration: none;
		color: white;
		border: none;
		box-sizing: border-box;
		border-radius: 4px;
	}
	.delete {
		padding: 15px;
		margin: 0 10px 0 10px;
		background: crimson;
		font-family: sans-serif;
		width: auto;
		white-space: nowrap;
		font-size: 0.9em;
		cursor: pointer;
		text-decoration: none;
		letter-spacing: 1px;
		font-weight: bold;
		color: white;
		border: none;
		box-sizing: border-box;
		border-radius: 4px;
		align-content: center;
	}
	.alert {
		background: crimson;
		font-size: 1em;
		font-family: sans-serif;
		font-weight: bold;
		width: 50%;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
		padding: 10px;
		border-radius: 5px;
	}
}
</style>-->