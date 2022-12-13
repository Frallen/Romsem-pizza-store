<template>
  <div class="basket">
    <div class="basket-wrapper">
      <div class="basket-item">
        <div class="basket-item-info">
          <div class="basket-item-img"><img src="" /></div>
          <div class="basket-item-text">
            <h5>4234</h5>
            <p>thtrhtr</p>
          </div>
        </div>
        <div class="basket-item-count">
          <count></count>
          <DefaultButton>Удалить</DefaultButton>
        </div>
      </div>
    </div>
  </div>
  <div class="basket-total">
    <div class="basket-total-price"><span>Итого</span> <span>1800 р</span></div>
    <div class="basket-total-form">
      <input
        :value="phone"
        v-imask="mask"
        @accept="onAccept"
        @complete="onComplete"
        class="input"
      />

      <DefaultButton>Заказать</DefaultButton>
    </div>
  </div>
</template>

<script>
import { IMaskDirective } from "vue-imask";
export default {
  name: "index",
  data() {
    return {
      phone: "",
      mask: {
        mask: "+{7} 000 00 00 000",
        lazy: false,
      },
    };
  },
  methods: {
    onAccept(e) {
      const maskRef = e.detail;
      this.value = maskRef.value;
      console.log("accept", maskRef.value);
    },
    onComplete(e) {
      const maskRef = e.detail;
      console.log("complete", maskRef.unmaskedValue);
    },
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>

<style scoped lang="less">
.basket {
  margin: 1em 0;
  &-wrapper {
    display: flex;
    flex-direction: column;
  }
  &-item {
    margin-top: 1em;
    background: #fff;
    padding: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .br(10px);
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
}
.basket-total {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100%;
  padding: 15px;
&-price{
  color: @black;
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
  &-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media @md {
      flex-direction: column;
      align-items: inherit;
    }
    .button {
      width: auto;
      @media @md {
        margin-top: 15px;
      }
    }
  }
}
</style>
