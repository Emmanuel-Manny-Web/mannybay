<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ data.email }}</td>
          <td>{{ data.phone }}</td>
          <td>{{ data.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Api from '../Api'
import { onBeforeMount } from '@vue/runtime-core'
export default {
  props: ['email'],
  setup(props) {
    const { email } = props
    const data = ref({})
    onBeforeMount(async () => {
      const res = await Api.getClientWithEmail(email)
      data.value = res.profile
    })
    return { data }
  }
}
</script>

<style>

</style>