<template>
  <div class="basket">
    <div class="basket-wrapper">
      <div
        class="basket-item"
        v-for="item in catalog.basketItems"
        :key="item.id"
      >
        <div class="basket-item-type" v-for="(i, index) in item.value" :key="i">
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
        <input
          ref="el"
          @accept="onAccept"
          @complete="onComplete"
          class="input"
        />
        <DefaultButton @click.stop="submit">Заказать</DefaultButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useIMask } from "vue-imask";
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog();
const config = useRuntimeConfig();
let phone = useState("phone");

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
  let order=[arr,summary.value]
  if(el.value){
    console.log( el.value.value);
  }
catalog.addOrder(order,el.value.value );
};

//let sum = useState("summary");

let onAccept = (e) => {
  const maskRef = e.detail;
  this.value = maskRef.value;
  // console.log("accept", maskRef.value);
};
let onComplete = (e) => {
  const maskRef = e.detail;
  // console.log("complete", maskRef.unmaskedValue);
};

const { el, masked } = useIMask({
  mask: "+{7} 000 00 00 000",
  lazy: false,
});
</script>

<style scoped lang="less">
.basket {
  margin: 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  @media @md {
    display: block;
    margin: 1em 0 13em;
  }
  &-wrapper {
    display: flex;
    flex-direction: column;
    width: 65%;
    @media @md {
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
      @media @md {
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
    @media @md {
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
      @media @md {
        font-size: 2em;
      }
    }
    &-form {
      display: flex;
      flex-direction: column;
      @media @md {
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
