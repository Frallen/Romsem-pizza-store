<template>
  <MainSlider></MainSlider>
  <div class="catalog-categories">
    <!--Картинки грузятся из директории public из-за расширения-->
    <NuxtLink class="catalog-categories-item" to="/category/Роллы"
      ><nuxt-img src="rolls.png" alt="" />
      <h4>Роллы</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/category/Суши"
      ><nuxt-img src="sushi.png" alt="" />
      <h4>Суши</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/category/Wok"
      ><nuxt-img src="wok.png" alt="" />
      <h4>Wok</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/category/пицца"
      ><nuxt-img src="pizza.png" alt="" />
      <h4>Пицца</h4></NuxtLink
    >
    <NuxtLink class="catalog-categories-item" to="/category/Вода"
      ><nuxt-img src="water.png" alt="" />
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media @md {
    margin: 15px 0 25px;
    grid-template-columns: repeat(3, 1fr);
  }
  @media @xs {
    margin: 15px 0 25px;
    grid-template-columns: repeat(2, 1fr);
  }

  &-item {
    background: #f9fafb;
    position: relative;
    overflow: hidden;

    text-decoration: none;
    .trs();
    .br(10px);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media (min-width: 320px) {
      height: 130px;
    }
    @media @md-up {
      height: 190px;
    }
    img {
      @media (min-width: 320px) {
        width: 76px;
        height: 60px;
      }
      @media @md-up {
        width: 136px;
        height: 106px;
      }
    }
    h4 {
      position: absolute;
      bottom: 5%;
      left: 4%;
      color: @black;
    }
  }
  &-item:hover {
    .trs();
    background: #eee;
  }
}
</style>
