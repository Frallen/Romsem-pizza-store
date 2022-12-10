<template>
<NuxtLink to="/basket" class="basket"><Basket></Basket><span class="basket-count">5</span></NuxtLink>
</template>

<script setup>
import Basket from "assets/img/basket.svg";
</script>

<style scoped lang="less">
.basket{
  text-decoration: none;
  position: fixed;
  bottom: 5%;
  right: 5%;
  background: #fff;
  .br(100%);
  .trs();padding: 8px 10px;
  svg {
    .trs();
    filter: invert(63%) sepia(98%) saturate(504%) hue-rotate(325deg)
    brightness(101%) contrast(108%);
  }
  &-count{
    background: @orange;
    color: #fff;
    font-size: 1em;
    .br(100%);
    position: absolute;
    right: 0;
    top: -9%;
    width: auto;
    padding: 2px 0.3em;
  }
}
</style>