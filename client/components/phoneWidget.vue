<template>
  <NuxtLink :to="`tel:${PhoneNumber}`" class="widget">
    <Phone></Phone>
  </NuxtLink>
</template>

<script setup>
import Phone from "assets/img/phone.svg";
let props = defineProps({
  PhoneNumber: {
    type: String,
  },
});
</script>

<style scoped lang="less">
.widget {
  bottom: 12%;
  right: 3%;
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>
