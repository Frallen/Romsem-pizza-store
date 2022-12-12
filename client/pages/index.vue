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

  <div class="offers">
    <div class="offers-wrapper">
      <div
        class="offers-item"
        :key="item.id"
        v-for="item in catalog.sortedCategories('Пицца')"
      >
        <CatalogItem :catalogItem="item"></CatalogItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
import { useIndex } from "~/store/index";
const catalog = useCatalog();
const indexData = useIndex();
catalog.getDeals();
</script>

<style lang="less">
.catalog-categories {
  margin: 25px 0 35px;
  display: grid;
  grid-template-areas:
    "a a b c"
    "d d e e";
  gap: 30px;
  @media @md {
    margin: 15px 0 25px;
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
.offers {
  margin: 25px 0 35px;
  @media @md {
    margin: 15px 0 25px;
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: -10px;
    margin-left: -10px;
    flex-wrap: wrap;
    @media @sm {
      margin-left: 0;
    }
  }
  &-item {
    margin-top: 10px;
    margin-left: 10px;
    width: calc(100% / 4 - 10px);
    @media @lg {
      width: calc(100% / 3 - 10px);
    }
    @media @md {
      width: calc(100% / 2 - 10px);
    }
    @media @sm {
      width: calc(100%);
      margin-left: 0;
    }
  }
}
</style>
