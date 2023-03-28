<template>
  <div class="carousel">
    <slot :currentSlide="currentSlide"/>

    <!-- Navigation -->
    <div class="navigate">
      <div class="toggle-page left">
        <img src="../visitor/bootstrap-icons-1.5.0/chevron-left.svg" alt="" class="img-fluid me-1" width="11" style="border-radius: 50%;">
      </div>
      <div class="toggle-page right">
        <img src="../visitor/bootstrap-icons-1.5.0/chevron-right.svg" alt="" class="img-fluid me-1" width="11" style="border-radius: 50%;">
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const currentSlide = ref(1)
const getSlideCount = ref(null)

onMounted(() => {
  getSlideCount.value = document.querySelectorAll(".slide").length
  console.log(getSlideCount.value)
})
</script>

<style>
.navigate {
  padding: 0 16px;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggle-page {
  display: flex;
  flex: 1;
}
.right {
  justify-content: flex-end;
}
img {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  background-color: #6347c7;
  padding: 0 5px;
}
</style>