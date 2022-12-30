<template>
  <MainSlider></MainSlider>
  <div class="catalog-categories">
    <NuxtLink class="catalog-categories-item" :to="'/category/Роллы'"
      ><img src="~/assets/img/rolls.jpg" alt="" />
      <h4>Роллы</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/Sushi"
      ><img src="~/assets/img/sushi.jpg" alt="" />
      <h4>Суши</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/Corndog"
      ><img src="~/assets/img/corndog.png" alt="" />
      <h4>Корн дог</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" :to="'/category/пицца'"
      ><img src="~/assets/img/pizza.png" alt="" />
      <h4>Пицца</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/water"
    ><img src="~/assets/img/water.jpg" alt="" />
      <h4>Напитки</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/stock"
      ><img src="~/assets/img/actions.png" alt="" />
      <h4>Акции</h4></NuxtLink
    >
  </div>
  <Offers :type="'Пицца'"></Offers>
  <Offers :type="'Сеты'"></Offers>
  <Offers :type="'Wok'"></Offers>
  <Offers :type="'Роллы'"></Offers>
  <Offers :type="'Суши'"></Offers>
  <Offers :type="'Салаты'"></Offers>
  <Offers :type="'Супы'"></Offers>
  <Offers :type="'Корндоги'"></Offers>
  <Offers :type="'Напитки'"></Offers>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog();
</script>

<style lang="less">
.catalog-categories {
  margin: 25px 0 35px;
  display: grid;
  gap: 30px;
  @media @xl-up {
    grid-template-columns: 1fr 1fr 1fr!important;
    grid-template-areas:
      "a b c"
      "d e f" !important;
  }

  @media @md {
    margin: 15px 0 25px;
  }
  @media @sm-up {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "a b"
      "c d"
      "e f";
  }
  @media @sm {
    grid-template-columns: 1fr;
    grid-template-areas:
      "a"
      "b"
      "c"
      "d"
      "e"
  "f";
  }
  &-item {
    position: relative;
    overflow: hidden;
    max-height: 200px;
    text-decoration: none;
    border: 1px solid #eee;
    .trs();
    .br(10px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    h4 {
      position: absolute;
      bottom: 5%;
      left: 4%;
    }
  }
  &-item:hover {
    box-shadow: 0 4px 8px 2px #0000003b;
    .trs();
  }
  &-item:nth-child(1) {
    grid-area: a;
  }
  &-item:nth-child(2) {
    grid-area: b;
  }
  &-item:nth-child(3) {
    grid-area: c;
  }
  &-item:nth-child(4) {
    grid-area: d;
  }
  &-item:nth-child(5) {
    grid-area: e;
  }
  &-item:nth-child(6) {
    grid-area: f;
  }
}
</style>
