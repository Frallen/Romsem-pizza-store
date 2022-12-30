<template>
  <div class="preloader">
    <nuxt-img src="cooking.png" alt="preloader" />
  </div>
</template>

<script setup>
</script>

<style scoped lang="less">
.preloader {
  z-index: 100;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  img {
    animation: showHide 1s alternate infinite;
  }
}
@keyframes showHide {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
