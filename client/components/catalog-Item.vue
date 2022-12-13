<template>
  <NuxtLink class="catalog-item">
    <div class="catalog-item-img">
      <img
        :src="
          config.public.env.STRAPI_URL +
          catalogItem.attributes.Image.data.attributes.url
        "
      />
    </div>
    <div class="catalog-item-box">
      <h5 class="catalog-item-title">{{ catalogItem.attributes.Title }}</h5>
      <p>{{ catalogItem.attributes.ingredients }}</p>
      <div class="size" v-if="catalogItem.attributes.product_sizes">
        <SelectSize
          :size="catalogItem.attributes.product_sizes"
          @selectedSize="($event) => (selectedSize = $event)"
        ></SelectSize>
      </div>
    </div>
    <DefaultButton
      @click.prevent="addToBasket(catalogItem.id)"
      class="catalog-item-btn"
      >В корзину</DefaultButton
    >
  </NuxtLink>
</template>

<script setup>
import {useCatalog} from "~/store/catalog";

const config = useRuntimeConfig();
const catalog =useCatalog()
let props = defineProps({
  catalogItem: {
    type: Object,
  },
});
let selectedSize = ref("");
let addToBasket = (id) => {
  let data = {
    id,
    ...(selectedSize ?? "")
  };
  catalog.addToBasket(data)
}
console.log(props.catalogItem.attributes.product_sizes);
</script>

<style scoped lang="less">
.catalog-item {
  background: #fff;
  overflow: hidden;
  .br(10px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  &-img {
    width: 100%;

    img {
      object-fit: contain;
      max-height: 300px;
      width: 100%;
      @media @sm {
        max-height: 200px;
      }
    }
  }
  &-box {
    display: flex;
    flex-direction: column;
  }
  &-title {
    font-size: 1.3em;
    padding: 0 10px;
    @media @md {
      font-size: 1em;
    }
  }
  p {
    margin: 10px;
    .text-eclipse();
    overflow: hidden;
  }
  &-btn {
  }
}
.size {
  margin: 15px 0;
}
</style>
