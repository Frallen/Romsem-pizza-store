<template>
  <NuxtLink to="/basket" class="widget"
    ><Icon name="iconoir:shopping-bag" :size="'1.6em'" />
    <div class="widget-count" v-show="count">+</div></NuxtLink
  >
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog();

let count = useState("count");

setInterval(() => {
  calc();
}, 2000);
let calc = () => {
  let cookie = useCookie("order");
  let order = [...(cookie.value ?? "")];

  count.value = order.length > 0;
};
calc();
</script>

<style scoped lang="less">
.widget {
  bottom: 5%;
  right: 3%;
  z-index: 2;
  @media @md {
    bottom: 25%;
  }
  &-count {
    background: @orange;
    color: #fff;
    font-size: 1em;
    .br(100%);
    position: absolute;
    right: -3px;
    top: -17%;
    padding: 5px 0.2em;
    height: 20px;
    width: 20px;
    line-height: 9px;
    text-align: center;
  }
}
</style>
