<template>
  <div class="catalog-item" @click.stop="go">
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
      <p v-if="catalogItem.attributes.Description">{{ catalogItem.attributes.Description }}</p>
      <div class="size" v-if="catalogItem.attributes.product_sizes.data.length">
        <SelectSize
          :size="catalogItem.attributes.product_sizes"
          @selectedSize="($event) => (selectedSize = $event)"
        ></SelectSize>
      </div>
    </div>
    <div class="price-block">
      <DefaultButton
        @click.stop="addToBasket(catalogItem.id)"
        class="catalog-item-btn"
        >В корзину</DefaultButton
      >
      <div class="price">{{ catalogItem.attributes.Price }} Р</div>
    </div>
  </div>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
let props = defineProps({
  catalogItem: {
    type: Object,
  },
});

let selectedSize = ref("");
const router = useRouter();
const config = useRuntimeConfig();
const catalog = useCatalog();
const slug = useSlug(props.catalogItem.attributes.Title);

let go = () => {
  router.push(`catalog/${slug}/${props.catalogItem.id}`);
};

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
  cursor: pointer;
  background: #fff;
  overflow: hidden;
  .br(10px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  text-decoration: none;
  &-img {
    width: 100%;

    img {
      object-fit: contain;
      height: 250px;
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
  .price-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    .button {
      width: 68%;
      padding: 10px 14px;
      font-size: 20px;
      @media @xl {
        font-size: 1em;
      }
    }
  }
  .price {
    font-size: 1.3em;
    font-weight: 700;
    text-align: center;
    padding: 5px;
    width: 28%;
    white-space: nowrap;
    @media @xl {
      font-size: 1.1em;
    }
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
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  &-btn {
  }
}
.size {
  margin: 15px 0;
}
</style>
