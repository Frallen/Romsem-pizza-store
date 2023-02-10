<template>
  <div class="catalog-item" @click.stop="go">
    <div
      class="catalog-item-stock"
      v-if="catalogItem.attributes.stock"
      title="Скидка"
    >
      <Icon name="mingcute:sale-line" :size="'2em'" />
    </div>
    <Favorite
      class="favorite"
      :isFavorite="userState.favorited(catalogItem.id)"
      v-if="userState.isAuth"
      :id="catalogItem.id"
    ></Favorite>
    <div class="catalog-item-img">
      <NuxtImg
        provider="cloudinary"
        :src="catalogItem.attributes.Image.data.attributes.url"
      />
    </div>
    <div class="catalog-item-box">
      <h5 class="catalog-item-title">{{ catalogItem.attributes.Title }}</h5>
      <p v-if="catalogItem.attributes.Description">
        {{ catalogItem.attributes.Description }}
      </p>
      <div class="catalog-item-gram" v-if="catalogItem.attributes.Gramm">
        {{ catalogItem.attributes.Gramm }} г.
      </div>
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
      <div class="price-block-stock">
        <template v-if="catalogItem.attributes.stock">
          <div class="old-price">{{ catalogItem.attributes.Price }} Р</div>
          <div class="price">
            {{
              catalogItem.attributes.Price -
              catalogItem.attributes.Price *
                (catalogItem.attributes.stock / 100)
            }}
            Р
          </div></template
        >
        <div v-else class="price">{{ catalogItem.attributes.Price }} Р</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalog } from "~/store/catalog";
import { useUser } from "~/store/user";
import {
  addToBasketType,
  catalogItemAttributes,
  catalogItemType,
} from "~/types/catalog.types";

interface PropsType {
  catalogItem: catalogItemType;
}

let { catalogItem } = defineProps<PropsType>();
const userState = useUser();
let selectedSize = ref<string>("");
const router = useRouter();
const config = useRuntimeConfig();
const catalog = useCatalog();
const slug = useSlug(catalogItem.attributes.Title);
//const Status = useState(props.catalogItem.id.toString());

let go = () => {
  router.push(`/catalog/${slug}/${catalogItem.id}`);
};

let addToBasket = (id: number) => {
  let data: addToBasketType = {
    id,
    value: [selectedSize.value],
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
  position: relative;
  .favorite {
    z-index: 2;
  }
  &-stock {
    position: absolute;
    top: 8px;
    left: 8px;
    .br(100%);
    text-align: right;
    font-weight: 900;
    color: @orange;
  }
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
    padding: 15px 0 10px;
    .button {
      width: 55%;
      padding: 10px 14px;
      font-size: 20px;
      @media @xl {
        font-size: 1em;
      }
    }
    &-stock {
      width: 45%;
      padding: 5px;
      white-space: nowrap;
      text-align: right;
      position: relative;
      .old-price {
        text-decoration: line-through;
        color: @gray-price;
        top: -13px;
        right: 0;
        position: absolute;
      }
      .price {
        font-size: 1.3em;
        font-weight: 700;

        @media @xl {
          font-size: 1.1em;
        }
      }
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
    .text-eclipse(1);
    overflow: hidden;
  }
  &-btn {
  }
  &-gram {
    margin-top: 1em;
    padding: 10px;
    font-size: 1em;
    font-weight: 700;
    color: @gray-gram;
    background: @gray;
    .br(15px);
    text-align: center;
  }
}
.size {
  margin: 15px 0;
}
</style>
