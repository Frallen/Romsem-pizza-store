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
            <count
              :Price="item.attributes.Price"
              @summary="(e) => (calc(e))"
            ></count>
            <DefaultButton>Удалить</DefaultButton>
          </div>
        </div>
      </div>
    </div>
    <div class="basket-total">
      <div class="basket-total-price">
        <span>Итого</span> <span>{{ sum }} р</span>
      </div>
      <div class="basket-total-form">
        <input
          :value="phone"
          ref="el"
          @accept="onAccept"
          @complete="onComplete"
          class="input"
        />
        <DefaultButton>Заказать</DefaultButton>
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

let sum=useState("summary");
let doc;
let arr=[]
let calc =  (item) => {



  arr.push(item._value)



};

let calc2=()=>{

  sum.value=  arr.reduce((acc, number) => acc + number, 0)
  arr=[]
}
calc2()
onMounted(()=>{


   // document.querySelectorAll('.count').forEach(p=>arr.push(parseInt(p.dataset.sum) ) )

})



let onAccept = (e) => {
  const maskRef = e.detail;
  this.value = maskRef.value;
  // console.log("accept", maskRef.value);
};
let onComplete = (e) => {
  const maskRef = e.detail;
  // console.log("complete", maskRef.unmaskedValue);
};
let scroll = () => {
  console.log("gg");
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
</style>
