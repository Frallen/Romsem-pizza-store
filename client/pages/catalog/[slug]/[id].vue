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
      <p>{{ item.attributes.ingredients }}</p>
      <SelectSize
        :size="item.attributes.product_sizes"
        @selectedSize="($event) => (selectedSize = $event)"
      ></SelectSize>
      <DefaultButton>В корзину</DefaultButton>
    </div>
  </div>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog();
const config = useRuntimeConfig();
const route = useRoute()

let item = catalog.filteredItem(route.params.id);
console.log(item);
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
    .br(10px);
    @media @md {
      width: 100%;
      margin-top: 2em;
    }
    h2 {
    }
    .button {
      margin-top: 1em;
    }
  }
}
</style>