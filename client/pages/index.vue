<template>
  <MainSlider></MainSlider>
  <div class="catalog-categories">
    <!--Картинки грузятся из директории public из-за расширения-->
    <NuxtLink class="catalog-categories-item" to="/category/Роллы"
      ><nuxt-img src="rolls.jpg" alt="" />
      <h4>Роллы</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/category/Суши"
      ><nuxt-img src="sushi.jpg" alt="" />
      <h4>Суши</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/category/Корндоги"
      ><nuxt-img src="corndog.png" alt="" />
      <h4>Корн дог</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/category/пицца"
      ><nuxt-img src="pizza.png" alt="" />
      <h4>Пицца</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/category/Вода"
      ><nuxt-img src="water.jpg" alt="" />
      <h4>Напитки</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/stock"
      ><nuxt-img src="actions.png" alt="" />
      <h4>Акции</h4></NuxtLink
    >
  </div>
  <Offers
    :type="'Пицца'"
    :data="catalog.sortedCategories('Пицца')"
    v-if="catalog.sortedCategories('Пицца').length"
  ></Offers>
  <Offers
    :type="'Сеты'"
    :data="catalog.sortedCategories('Сеты')"
    v-if="catalog.sortedCategories('Сеты').length"
  ></Offers>
  <Offers
    :type="'Wok'"
    :data="catalog.sortedCategories('Wok')"
    v-if="catalog.sortedCategories('Wok').length"
  ></Offers>
  <Offers
    :type="'Роллы'"
    :data="catalog.sortedCategories('Роллы')"
    v-if="catalog.sortedCategories('Роллы').length"
  ></Offers>
  <Offers
    :type="'Суши'"
    :data="catalog.sortedCategories('Суши')"
    v-if="catalog.sortedCategories('Суши').length"
  ></Offers>
  <Offers
    :type="'Салаты'"
    :data="catalog.sortedCategories('Салаты')"
    v-if="catalog.sortedCategories('Салаты').length"
  ></Offers>
  <Offers
    :type="'Супы'"
    :data="catalog.sortedCategories('Супы')"
    v-if="catalog.sortedCategories('Супы').length"
  ></Offers>
  <Offers
    :type="'Корндоги'"
    :data="catalog.sortedCategories('Корндоги')"
    v-if="catalog.sortedCategories('Корндоги').length"
  ></Offers>
  <Offers
    :type="'Напитки'"
    :data="catalog.sortedCategories('Напитки')"
    v-if="catalog.sortedCategories('Напитки').length"
  ></Offers>
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
    grid-template-columns: 1fr 1fr 1fr !important;
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
