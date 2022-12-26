<template>
  <MainSlider></MainSlider>
  <div class="catalog-categories">
    <NuxtLink class="catalog-categories-item" to="/chicken"
      ><img src="~/assets/img/chicken.png" alt="" />
      <h4>Чикен</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/Sushi"
      ><img src="~/assets/img/sushi.png" alt="" />
      <h4>С угрем</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/Corndog"
      ><img src="~/assets/img/corndog.png" alt="" />
      <h4>Корн дог</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/pizza"
      ><img src="~/assets/img/pizza.png" alt="" />
      <h4>Пицца</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/Actions"
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
  grid-template-areas:
    "a a b c"
    "d d e e";
  gap: 30px;
  @media @xl {
    grid-template-areas:
      "a a b b"
      "c c d d"
      "e e e e";
  }
  @media @md {
    margin: 15px 0 25px;
  }
  @media @sm {
    grid-template-areas:
      "a a a a"
      "b b b b"
      "c c c c"
      "d d d d"
      "e e e e";
  }
  &-item {
    text-decoration: none;
    position: relative;
    overflow: hidden;
    max-height: 200px;
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
}
</style>
