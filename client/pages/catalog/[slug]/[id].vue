<template>
  <div class="catalog-item">
    <div class="catalog-item-img">
      <img
        :src="
          config.public.strapi.url +
          exist().attributes.Image.data.attributes.url
        "
      />
      <div
        class="catalog-item-stock"
        v-if="exist().attributes.stock"
        title="Скидка"
      >
        %
      </div>
    </div>
    <div class="catalog-item-text">
      <h2>{{ exist().attributes.Title }}</h2>
      <div class="catalog-item-ingridient">
        <div
          class="ingridient"
          v-for="item in exist().attributes.ingridients.data"
        >
          {{ item.attributes.Ingridient }}
        </div>
      </div>
      <p>{{ exist().attributes.ingredients }}</p>
      <SelectSize
        :size="exist().attributes.product_sizes"
        @selectedSize="($event) => (selectedSize = $event)"
      ></SelectSize>
      <div class="catalog-item-box">
        <h3>Цена:</h3>
        <div v-if="exist().attributes.stock" class="catalog-item-price">
          <div class="old-price">{{ exist().attributes.Price }} Р</div>
          <div class="price">
            {{
              exist().attributes.Price -
              exist().attributes.Price * (exist().attributes.stock / 100)
            }}
            Р
          </div>
        </div>
        <div v-else class="price">{{ exist().attributes.Price }} Р</div>
      </div>
      <DefaultButton @click.stop="addToBasket(exist().id)"
        >В корзину</DefaultButton
      >
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
console.log(catalog.filteredItem(route.params.id));
let exist = () => {
  if (catalog.filteredItem(route.params.id))
    return catalog.filteredItem(route.params.id);
  else
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
};

//console.log(item);
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
    overflow: hidden;
    position: relative;
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
  &-stock {
    position: absolute;
    top: -4px;
    right: -1px;
    padding: 8px;
    background: @orange;
    border-radius: 7px;
    text-align: right;
    font-weight: 900;
    color: #fff;
    transform: rotate(351deg);
    font-size: 1.2em;
  }
  &-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1em 0;
    h3 {
      margin-bottom: 0;
      font-size: 2em;
    }
    .old-price {
      text-decoration: line-through;
      color: @gray-price;
      font-size: 1.2em;
    }
    .price {
      font-size: 1.5em;
      font-weight: 700;

      @media @xl {
        font-size: 1.3em;
      }
    }
  }
  &-price {
    text-align: right;
  }
  &-text {
    width: 40%;
    padding: 10px;
    background: #fff;
    height: fit-content;
    overflow: hidden;
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
      padding: 10px 15px;
      text-transform: capitalize;
      .br(15px);
      cursor: default;
      background: @gray;
      color: @black;
      font-weight: 600;
    }
  }
}
</style>
