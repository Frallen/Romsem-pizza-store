<template>
  <NuxtLink to="/basket" class="widget"
    ><Basket></Basket>
    <div class="widget-count" v-if="count">{{ count }}</div></NuxtLink
  >
</template>

<script setup>
import Basket from "assets/img/basket.svg";
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog();
let cookie = useCookie("order");
let order = [...(cookie.value ?? "")];

let count = useState("count");

onMounted(() => {
  calc();
});
let calc = () => {
  let arr = [];
  order.map((p) => {
    arr.push(p.value.length);
  });

  count.value = arr.reduce((acc, number) => acc + number, 0);
};
</script>

<style scoped lang="less">
.widget {
  bottom: 5%;
  right: 3%;

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
