<template>
  <div
    class="orders-item"
    @click.stop="show ? (show = false) : (show = true)"
    :class="{ showHide: show }"
  >
    <div class="orders-item-head">
      <h5>
        Заказ от
        {{ moment(item.attributes.createdAt).format("DD.MM.YYYY hh:mm") }}
      </h5>
      <div class="arrow"><Icon name="gg:arrow-down" :size="'1.8em'" /></div>
    </div>
    <div class="orders-item-body">
      <div class="order">
        <div
          class="order-item"
          v-for="p in JSON.parse(item.attributes.OrderItems)"
        >
          <span>{{ p.Title }}</span>
          <span>{{ p.Type }}</span>
          <span>{{ p.count }}X</span>
          <span>{{ p.sum }} Руб</span>
        </div>
      </div>
      <div class="order-sum">Итого: {{ item.attributes.Sum }} Руб</div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
let props = defineProps({
  item: {
    type: Object,
  },
});

let show = useState(props.item.id.toString());
show.value = false;
</script>

<style scoped lang="less">
.orders-item {
  background: #fff;
  .shadow();
  margin-top: 1em;
  padding: 15px;
  .br(10px);
  user-select: none;
  overflow: hidden;
  .trs();
  cursor: pointer;
  h5 {
    font-size: 1.3em;
    color: @black;
  }
  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-body {
    height: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media @md {
      flex-direction: column;
      align-items: baseline;
    }
    .trs();
    .order-sum {
      font-weight: 600;
      height: fit-content;
      font-size: 1.3em;
      @media @md {
        align-self: flex-end;
      }
    }
    .order {
      display: flex;
      flex-direction: column;

      .order-item {
        display: grid;
        flex-direction: column;
        grid-template-columns: 1fr 100px 20px 100px;
        gap: 10px;
        margin-top: 1em;
        @media @md {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      .order-item:first-child {
        margin-top: 0;
      }
    }
  }
  .arrow {
    .trs();
  }
}
.showHide {
  .trs();
  .arrow {
    transform: rotate(180deg);
    .trs();
  }
  .orders-item-body {
    height: 100%;
    opacity: 1;
    visibility: visible;
    .trs();
    margin-top: 10px;
  }
}
</style>
