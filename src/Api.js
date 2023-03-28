import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('authenticated')

const url = "/panel"


export default class API {
  //login admin
  static async getAllAdmin() {
    const res = await axios.get(`${url}`)
    return res.data
  }
  //login admin into the database
  static async loginAdminIntoDB(admin) {
    const res = await axios.post(`${url}/login`, admin)
    return res.data
  }
  static async logoutAdmin() {
    const res = await axios.get(`${url}/logout`)
    return res.data
  }
  //get admin by id
  static async getAdminById(id) {
    const res = await axios.get(`${url}/home/${id}`)
    return res.data
  }
  static async updateAdmin(id, post) {
    const res = await axios.patch(`${url}/update/${id}`, post)
    return res.data
  }
  static async createAdmin(admin) {
    const res = await axios.post(`${url}/create`, admin)
    return res.data
  }
  static async deleteAdmin(id) {
    const res = await axios.delete(`${url}/delete/${id}`)
    return res.data
  }
  static async createPost(id, post) {
    const res = await axios.post(`${url}/post/${id}`, post)
    return res.data
  }
  static async getAllPosts() {
    const res = await axios.get(`${url}/post`)
    return res.data
  }
  static async getPost(id, contentid) {
    const res = await axios.get(`${url}/postedit/${id}/${contentid}`)
    return res.data
  }
  static async updatePost(id,contentid, post) {
    const res = await axios.post(`${url}/postedit/${id}/${contentid}`, post)
    return res.data
  }
  static async deletePost(id, postid) {
    const res = await axios.delete(`${url}/post/${id}/${postid}`)
    return res.data
  }
  static async getNotification() {
    const res = await axios.get(`${url}/notification`)
    return res.data
  }
  static async getItem(id) {
    const res = await axios.get(`${url}/notification/${id}`)
    return res.data
  }
  static async getCustomerStoreItem(id) {
    const res = await axios.get(`/material/items/${id}`)
    return res.data
  }
  static async getClient(id) {
    const res = await axios.get(`/material/client/${id}`)
    return res.data
  }
  static async getClientWithEmail(email) {
    const res = await axios.get(`${url}/client/${email}`)
    return res.data
  }
}