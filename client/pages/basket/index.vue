<template>
  <div class="basket">
    <template v-if="catalog.basketItems.length">
      <div class="basket-wrapper">
        <div
          class="basket-item"
          v-for="item in catalog.basketItems"
          :key="item.id"
        >
          <div
            class="basket-item-type"
            v-for="(i, index) in item.value"
            :key="i"
          >
            <div class="basket-item-info">
              <div class="basket-item-img">
                <img
                  :src="
                    config.public.env.STRAPI_URL +
                    item.attributes.Image.data.attributes.url
                  "
                />
              </div>
              <div class="basket-item-text">
                <h5>{{ item.attributes.Title }}</h5>
                <p>{{ i }}</p>
              </div>
            </div>
            <div class="basket-item-count">
              <div class="count">
                <div class="count-number">
                  <div
                    class="count-number-quality"
                    :data-value="1"
                    :data-sum="item.attributes.Price"
                    :data-price="item.attributes.Price"
                  >
                    {{ 1 }} X
                  </div>
                  <div class="count-number-price">
                    {{ item.attributes.Price }}р
                  </div>
                </div>
                <div class="count-manipulate">
                  <div
                    class="count-manipulate-item minus"
                    @click.prevent="minus"
                  ></div>
                  <div
                    class="count-manipulate-item plus"
                    @click.prevent="plus"
                  ></div>
                </div>
              </div>
              <DefaultButton>Удалить</DefaultButton>
            </div>
          </div>
        </div>
      </div>
      <div class="basket-total">
        <div class="basket-total-price">
          <span>Итого</span> <span>{{ summary }} р</span>
        </div>
        <div class="basket-total-form">
          <MazPhoneNumberInput
            v-model="phoneNumber"
            :error="false"
            show-code-on-list
            color="info"
            :preferred-countries="['RU']"
            @update="results = $event"
            :success="results?.isValid"
            fetch-country
            :no-search="true"
            :no-country-selector="true"
            :translations="{
              phoneInput: {
                example: 'Пример:',
              },
            }"
          />
          <DefaultButton @click.stop="submit">Заказать</DefaultButton>
        </div>
      </div></template
    >
    <div v-else class="basket-empty">
      <Trash></Trash>
      <h3>В корзине пусто</h3>
      <NuxtLink to="/" class="button">На главную</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import Trash from "assets/img/Trash.svg";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog();
const config = useRuntimeConfig();
const phoneNumber = ref("");
const results = ref();
let summary = ref("");

let minus = (e) => {
  let quality = e.currentTarget.parentNode.parentNode.parentNode.querySelector(
    ".count-number-quality"
  );

  if (quality.dataset.value <= 1) {
    quality.dataset.value = 1;
  } else if (parseInt(quality.dataset.value) !== 1) {
    quality.dataset.value = parseInt(quality.dataset.value) - 1;
  }
  if (quality.dataset.sum !== quality.dataset.price) {
    quality.dataset.sum = parseInt(quality.dataset.sum - quality.dataset.price);
  }

  quality.textContent = quality.dataset.value + " X";
  calc(e);
};
let plus = (e) => {
  let quality = e.currentTarget.parentNode.parentNode.parentNode.querySelector(
    ".count-number-quality"
  );

  quality.dataset.value = parseInt(quality.dataset.value) + 1;
  quality.dataset.sum = parseInt(quality.dataset.value * quality.dataset.price);
  quality.textContent = quality.dataset.value + " X";
  calc(e);
};

let calc = (e) => {
  let arr = [];
  document.querySelectorAll(".count-number-quality").forEach((p) => {
    arr.push(parseInt(p.dataset.sum));
  });
  summary.value = arr.reduce((acc, number) => acc + number, 0);
};
onMounted(() => {
  calc();
});

let submit = () => {
  if (phoneNumber.value) {
    let arr = [];
    document.querySelectorAll(".basket-item-type").forEach((p) => {
      let obj = {
        Title: p.querySelector(".basket-item-text h5").textContent,
        Type: p.querySelector(".basket-item-text p").textContent,
        sum: p.querySelector(".count-number-quality").dataset.sum,
        count: p.querySelector(".count-number-quality").dataset.value,
      };
      arr.push(obj);
    });
    let order = [arr, summary.value];

    catalog.addOrder(order, phoneNumber.value);
  } else {
    useNuxtApp().$swal.fire({
      title: "Ошибка",
      text: "Введите номер телефона",
      icon: "error",
      confirmButtonText: "Хорошо",
    });
  }
};
</script>

<style scoped lang="less">
.basket {
  margin: 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  @media @lg {
    display: block;
    margin: 1em 0 13em;
  }
  &-wrapper {
    display: flex;
    flex-direction: column;
    width: 65%;
    @media @lg {
      width: 100%;
    }
  }

  &-item {
    margin-top: 1em;
    &-type {
      margin-top: 1em;
      background: #fff;
      padding: 10px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .br(10px);
      @media @lg {
        flex-direction: column;
      }
    }
    &-type:first-child {
      margin-top: 0;
    }
    &-img {
      width: 100px;
      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
    &-info {
      display: flex;
    }
    &-text {
      margin-left: 10px;

      h5 {
        font-size: 1.4em;
      }
      p {
        font-size: 1.1em;
      }
    }
    &-count {
      .button {
        padding: 2px 5px;
        margin-top: 10px;
      }
    }
  }
  &-item:first-child {
    margin-top: 0;
  }
  &-total {
    position: sticky;
    top: 8%;
    height: fit-content;
    background: #fff;
    width: 30%;
    padding: 15px;
    @media @lg {
      position: fixed;
      top: inherit;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    &-price {
      color: @black;
      font-size: 1.5em;
      font-weight: 700;
      text-align: center;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media @lg {
        font-size: 2em;
      }
    }
    &-form {
      display: flex;
      flex-direction: column;
      @media @lg {
        justify-content: space-between;

        flex-direction: column;
        align-items: inherit;
      }
      .button {
        margin-top: 15px;
        width: auto;
      }
    }
  }
  &-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    top: 35%;
    left: 0;
    right: 0;
    h3 {
      margin: 10px 0 1em;
      font-size: 2em;
    }
    svg {
    }
  }
}
.count {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  &-manipulate {
    display: flex;
    align-items: center;
    gap: 5px;
    &-item {
      color: @black;
      font-size: 1.3em;
      padding: 5px 10px;
      background: @orange;
      cursor: pointer;
      position: relative;
      width: 40px;
      height: 24px;
    }
    .minus::before {
      content: "";
      display: block;
      height: 12px;
      width: 2px;
      border-radius: 2px;
      background: #000;
      position: absolute;
      top: calc(50% - 6px);
      left: calc(50% - 1px);
      transform: rotate(90deg);
    }
    .plus::after {
      content: "";
      display: block;
      height: 12px;
      width: 2px;
      border-radius: 2px;
      background: #000;
      position: absolute;
      top: calc(50% - 6px);
      left: calc(50% - 1px);
      transform: rotate(90deg);
    }
    .plus::before {
      content: "";
      display: block;
      height: 12px;
      width: 2px;
      border-radius: 2px;
      background: #000;
      position: absolute;
      top: calc(50% - 6px);
      left: calc(50% - 1px);
    }
    &-item:first-child {
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
    }
    &-item:last-child {
      border-bottom-right-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  &-number {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
    input {
      border: none;
      background: transparent;
    }
    &-quality {
      color: #dadada;
      font-size: 24px;
      margin-right: 10px;
    }
    &-price {
      font-weight: 600;
      font-size: 24px;
    }
  }
}
</style>
