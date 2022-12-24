<template>
  <div class="catalog-item">
    <div class="catalog-item-img">
      <img
        :src="
          config.public.env.STRAPI_URL +
          item.attributes.Image.data.attributes.url
        "
      />
    </div>
    <div class="catalog-item-text">
      <h2>{{ item.attributes.Title }}</h2>
      <div class="catalog-item-ingridient">
        <div
          class="ingridient"
          v-for="item in item.attributes.ingridients.data"
        >
          {{ item.attributes.Ingridient }}
        </div>
      </div>
      <p>{{ item.attributes.ingredients }}</p>
      <SelectSize
        :size="item.attributes.product_sizes"
        @selectedSize="($event) => (selectedSize = $event)"
      ></SelectSize>
      <DefaultButton @click.stop="addToBasket(item.id)">В корзину</DefaultButton>
    </div>
  </div>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog();
const config = useRuntimeConfig();
const route = useRoute();
let selectedSize = ref("");
let item = catalog.filteredItem(route.params.id);
console.log(item);
let addToBasket = (id) => {
  let data = {
    id,
    ...(selectedSize ?? ""),
  };
  catalog.addToBasket(data);
};
</script>

<style scoped lang="less">
.catalog-item {
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
  @media @md {
    flex-direction: column;
  }
  &-img {
    background: #fff;
    width: 55%;
    height: 350px;
    .br(10px);
    @media @md {
      width: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &-text {
    width: 40%;
    padding: 10px;
    background: #fff;
    height: fit-content;
    .br(10px);
    @media @md {
      width: 100%;
      margin-top: 2em;
    }
    h2 {
      margin-bottom: 10px;
    }
    p {
      margin-top: 1em;
    }
    .button {
      margin-top: 1em;
    }
  }
  &-ingridient {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: -5px;
    margin-left: -5px;
    .ingridient {
      margin-top: 5px;
      margin-left: 5px;
      padding: 5px 10px;
      text-transform: capitalize;
      .br(15px);
      border: 1px solid;
      cursor: default;
      background: @pink;
      color: #fff;
      font-weight: 600;
    }
  }
}
</style>
