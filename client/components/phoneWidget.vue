<template>
  <NuxtLink :to="`tel:${PhoneNumber}`" class="widget">
    <Icon name="lucide:smartphone" :size="'1.6em'"/>
  </NuxtLink>
</template>

<script setup>
let props = defineProps({
  PhoneNumber: {
    type: String,
  },
});
</script>

<style scoped lang="less">
.widget {
  bottom: 15%;
  right: 3%;
  z-index: 2;
  @media @md {
    bottom: 35%;
  }

}
</style>
