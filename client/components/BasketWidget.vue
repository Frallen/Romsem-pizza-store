<template>
  <NuxtLink to="/basket" class="basket"
    ><Basket></Basket
    ><div class="basket-count" v-if="count">{{ count }}</div></NuxtLink
  >
</template>

<script setup>
import Basket from "assets/img/basket.svg";
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog();
let cookie = useCookie("order");
let order = [...(cookie.value ?? "")];

let count = useState("count");
count.value = catalog.catalogItems.filter(
  (p) => order.find((z) => z.id === p.id) && p
).length;
</script>

<style scoped lang="less">
.basket {
  text-decoration: none;
  position: fixed;
  bottom: 5%;
  right: 3%;
  background: #fff;
  .br(100%);
  .trs();
  padding: 8px 10px;
  svg {
    .trs();
    filter: invert(63%) sepia(98%) saturate(504%) hue-rotate(325deg)
      brightness(101%) contrast(108%);
  }
  &-count {
    background: @orange;
    color: #fff;
    font-size: 1em;
    .br(100%);
    position: absolute;
    right: 0;
    top: -17%;
    padding: 4px 0.3em;
    height: auto;
    width: auto;
    line-height: 12px;
  }
}
</style>
