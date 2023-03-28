import axios from 'axios';
import { getAccessToken } from './accessToken'

axios.defaults.withCredentials = true

const url = '/material'
const token =  getAccessToken();
//axios.defaults.headers.common['Authorization'] = "Bearer " + token

export default class API {
  static async getAllPosts() {
    const res = await axios.get(url)
    return res.data
  }
  static async getPost(tool, contentid) {
    const res = await axios.get(`${url}/products/${tool}/${contentid}`)
    return res.data
  }
  static async getMaterial(id) {
    const res = await axios.get(`${url}/cart/${id}`)
    return res.data
  }
  static async signUp(profile) {
    const res = await axios.post(`${url}/cart`, profile)
    return res.data
  }
  static async signIn(profile) {
    const res = await axios.post(`${url}/signin`, profile)
    return res.data
  }
  static async logout() {
    const res = await axios.get(`${url}/logout`)
    return res.data
  }
  static async buyProduct() {
    const res = await axios.get(`${url}/buy`)
    return res.data
  }
  static async checkOut() {
    const res = await axios.post(`${url}/buy`)
    return res.data
  }
  static async getUser() {
    const res = await axios.get(`${url}/user`)
    return res.data
  }
  static async createOrder(body) {
    const res = await axios.post(`${url}/order`, body)
    return res.data
  }
  static async createStore(body) {
    const res = await axios.post(`${url}/account/create`, body)
    return res.data
  }
  static async getUserStore() {
    const res = await axios.get(`${url}/account`)
    return res.data
  }
  static async listItem(body) {
    const res = await axios.post(`${url}/account/manage`, body)
    return res.data
  }
  static async getUserStoreItems() {
    const res = await axios.get(url + "/account/item")
    return res.data
  }
  static async editItem(id) {
    const res = await axios.get(`${url}/account/item/${id}`)
    return res.data
  }
  static async updateItem(id, body) {
    const res = await axios.put(`${url}/account/item/${id}`, body)
    return res.data
  }
  static async changeStoreName(body) {
    const res = await axios.put(`${url}/account/store/name`, body)
    return res.data
  }
  static async changePlan(body) {
    const res = await axios.put(`${url}/account/store/plan`, body)
    return res.data
  }
  static async changeFulfillment(body) {
    const res = await axios.put(`${url}/account/store/fulfillment`, body)
    return res.data
  }
  static async changeCategory(body) {
    const res = await axios.put(`${url}/account/store/category`, body)
    return res.data
  }
  static async changeBank(body) {
    const res = await axios.put(`${url}/account/store/bank`, body)
    return res.data
  }
  static async suspendAccount(body) {
    const res = await axios.put(`${url}/account/store/suspend`, body)
    return res.data
  }
  static async getDeactivatedAccount() {
    const res = await axios.get(`${url}/account/store/deactivated`)
    return res.data
  }
  static async getCustomerStoreItem(id) {
    const res = await axios.get(`${url}/items/${id}`)
    return res.data
  }
  static async getCustomerStore(storename) {
    const res = await axios.get(`${url}/store/${storename}`)
    return res.data
  }
  static async customerAnalytics() {
    const res = await axios.get(`${url}/analytic`)
    return res.data
  }
}