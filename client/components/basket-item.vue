<template>
  <div class="basket-item" :data-value="sum.value">
    <div class="basket-item-info">
      <div class="basket-item-img">
        <NuxtImg
          provider="cloudinary"
          :src="item.attributes.Image.data.attributes.url"
        />
      </div>
      <div class="basket-item-text">
        <h5>{{ item.attributes.Title }}</h5>
        <p>{{ type }}</p>
      </div>
    </div>
    <div class="basket-item-count">
      <div class="count">
        <div class="count-number">
          <div
            class="count-number-quality"
          >
            {{ count }} X
          </div>
          <div class="count-number-price">{{ item.attributes.Price }}р</div>
        </div>
        <div class="count-manipulate">
          <div
            class="count-manipulate-item minus"
            @click.prevent="parseInt(count) <= 1 ? count : count--"
          ></div>
          <div
            class="count-manipulate-item plus"
            @click.prevent="count++"
          ></div>
        </div>
      </div>
      <Icon
        @click.stop="Remove(item.id, type)"
        name="ph:trash-simple"
        :size="'2em'"
      />
    </div>
  </div>
</template>

<script setup>
let props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
  },
});

let emit = defineEmits(["remove", "sum"]);
let sum = ref(props.item.id);
let calc = () => {
  sum.value = parseInt(count.value) * parseInt(props.item.attributes.Price);
  emit("sum", { id: props.item.id,type:props.type, sum: sum.value });
};
let count = ref(1);
calc();

watch(
  () => count.value,
  () => {
    calc();
  }
);
let Remove = (id, type) => {
  emit("remove", id, type);
};
</script>

<style lang="less" scoped>
.basket-item {
  background: #fff;
  padding: 10px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .br(10px);
  @media @xs {
    flex-direction: column;
  }
  .basket-item-img {
    width: 100px;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  .basket-item-info {
    display: flex;
    align-items: center;
  }
  .basket-item-text {
    margin-left: 10px;

    h5 {
      font-size: 1.4em;
      @media @md {
        font-size: 1.2em;
      }
    }
    p {
      font-size: 1.1em;
      @media @md {
        font-size: 15px;
      }
    }
  }
  .basket-item-count {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media @xs {
      align-items: initial;
    }
    .button {
      padding: 2px 5px;
      margin-top: 10px;
    }
    .icon {
      margin-top: 1em;
      cursor: pointer;
      @media @xs {
        align-self: flex-end;
      }
    }
  }
  .count {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    @media @xs {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    &-manipulate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      background: #f1f4f9;
      padding: 10px;
      .br(40px);
      &-item {
        color: @black;
        font-size: 1.3em;
        cursor: pointer;
        position: relative;
        width: 30px;
        height: 15px;
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
      @media @xs {
        margin-bottom: 0;
      }
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
}
</style>
