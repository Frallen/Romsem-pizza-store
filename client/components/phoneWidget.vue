<template>
<NuxtLink :to="`tel:${PhoneNumber}`" class="basket">
<Phone></Phone>
</NuxtLink>
</template>

<script setup>import Phone from "assets/img/phone.svg";
let props=defineProps({
  PhoneNumber:{
    type:String
  }
})
console.log(props.PhoneNumber)
</script>

<style scoped lang="less">
.basket {
  bottom: 12%;
  right: 3%;
  svg{
    width: 30px;
    height: 30px;
  }
}
</style>