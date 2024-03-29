<template>
  <Head
    ><Title>{{ exist().attributes.Title }}</Title></Head
  >
  <div class="catalog-item">
    <div class="catalog-item-img shadow">
      <NuxtImg
        provider="cloudinary"
        :src="exist().attributes.Image.data.attributes.url"
      />
      <div
        class="catalog-item-stock"
        v-if="exist().attributes.stock"
        title="Скидка"
      >
        <Icon name="mingcute:sale-line" :size="'1.8em'" />
      </div>
      <Favorite
        class="favorite"
        :isFavorite="userState.favorited(exist().id)"
        :id="exist().id"
        v-if="userState.isAuth"
      ></Favorite>
    </div>
    <div class="catalog-item-info shadow">
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
      <div class="catalog-item-gram" v-if="exist().attributes.Gramm">
        {{ exist().attributes.Gramm }} г.
      </div>
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
  <div class="catalog-item-text shadow" v-if="exist().attributes.Text">
    <h5>Описание</h5>
    <p>{{ exist().attributes.Text }}</p>
  </div>
  <div class="reviews">
    <div class="reviews-head" v-if="userState.isAuth">
      <h5 class="reviews-title">Отзывы</h5>
      <DefaultButton
        class="button"
        v-if="
          !catalog
            .ReviewsByProduct(exist().id)
            .some((p) => p.attributes.Owner.id === userState.id)
        "
        @click="stateReview ? (stateReview = false) : (stateReview = true)"
      >
        <Icon name="ph:note-pencil-light" :size="'1.3em'" />{{
          stateReview ? "Закрыть форму" : "Оставить отзыв"
        }}</DefaultButton
      >
    </div>
    <div class="reviews-form">
      <transition name="fade">
        <UseForm
          :Schema="useReview()"
          class="form"
          v-show="stateReview"
          @data="addReview"
        >
          <label for="title" class="form-item">
            <span>Заголовок отзыва</span>
            <Field name="title" id="title" class="input" type="text" />
            <ErrorMessage name="title" class="error" />
          </label>
          <label for="text" class="form-item">
            <span>Текст отзыва</span>
            <Field name="text" id="text" type="text-area" v-slot="{ field }">
              <textarea class="textarea" v-bind="field"></textarea>
            </Field>
            <ErrorMessage name="text" class="error" />
          </label>
          <DefaultButton>Сохранить отзыв</DefaultButton>
        </UseForm></transition
      >
    </div>
    <div
      class="reviews-body"
      v-if="catalog.ReviewsByProduct(exist().id).length"
    >
      <div
        class="reviews-body-item review-shadow"
        v-for="item in catalog.ReviewsByProduct(exist().id)"
        :key="item.id"
      >
        <div class="review-head">
          <div
            class="toOwner"
            v-if="
              userState.user &&
              item.attributes.Owner.data.id === userState.user.id
            "
          >
            <Icon name="ic:baseline-star-rate" :size="'1.6em'" />
          </div>
          <div class="owner">
            {{ item.attributes.Owner.data.attributes.FI }}
          </div>
          <div class="date">
            {{
              moment(item.attributes.Owner.data.attributes.createdAt).format(
                "DD.MM.YYYY"
              )
            }}
          </div>
        </div>
        <h6>{{ item.attributes.Title }}</h6>
        <p>{{ item.attributes.Text }}</p>
      </div>
    </div>
    <div class="reviews-empty" v-else>
      <Icon name="system-uicons:battery-empty" :size="'3em'" />
      <h3>Отзывы отсутствуют</h3>
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { useReview } from "~/composables/useSchema";
import { useCatalog } from "~/store/catalog";
import { useUser } from "~/store/user";
import moment from "moment";
const userState = useUser();
const catalog = useCatalog();
const config = useRuntimeConfig();
const route = useRoute();
let selectedSize = ref("");
let stateReview = useState("stateReview");
stateReview.value = false;
let item = catalog.filteredItem(route.params.id);
//console.log(catalog.filteredItem(route.params.id));
let exist = () => {
  if (catalog.filteredItem(parseInt(route.params.id)))
    return catalog.filteredItem(parseInt(route.params.id));
  else
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
};

let addReview = (review) => {
  catalog.addReview(review, exist().id, userState.user.id);
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
  display: flex;
  justify-content: space-between;
  margin: 1em 0 2em;
  .br(10px);
  background: #fff;
  @media @md {
    flex-direction: column;
  }
  &-img {
    width: 55%;
    .br(10px);
    height: 350px;
    position: relative;
    background: #fff;
    @media @md {
      width: 100%;
      height: 250px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &-stock {
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px;
    border-radius: 7px;
    text-align: right;
    font-weight: 900;
    color: @orange;
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
  &-info {
    width: 40%;
    padding: 15px 10px 20px;
    background: #fff;
    height: fit-content;
    overflow: hidden;
    .br(10px);
    @media @md {
      width: 100%;
      margin-top: 10px;
    }
    h2 {
      font-size: 3em;
      margin-bottom: 10px;
      @media @md {
        font-size: 2.3em;
      }
    }
    p {
      margin-top: 1em;
    }
    .button {
      margin-top: 1em;
    }
  }
  &-gram {
    margin: 10px 0;
    padding: 10px;
    font-size: 1em;
    font-weight: 700;
    color: @gray-gram;
    background: @gray;
    .br(15px);
    text-align: center;
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
.catalog-item-text {
  background: #fff;
  .br(10px);
  padding: 15px;
  h5 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  p {
    text-align: justify;
    padding: 0;
    margin: 0;
  }
}

.reviews {
  margin-top: 1.5em;
  &-title {
    font-size: 3em;
  }
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media @xs {
      flex-direction: column;
      align-items: flex-start;
    }
    .icon {
      margin-right: 10px;
    }
    .button {
      width: 30%;
      font-size: 1.2em;
      @media @md {
        width: 48%;
      }
      @media @xs {
        width: 100%;
      }
    }
  }
  &-body {
    &-item {
    }
  }
  &-item:first-child {
  }
  &-empty {
    display: flex;
    align-items: center;
    color: @gray-price;
    h3 {
      margin-left: 1em;
      font-size: 2em;
      color: @gray-price;
      font-weight: 400;
    }
  }
}
</style>
