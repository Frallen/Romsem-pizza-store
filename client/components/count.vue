<template>
  <div class="count" :data-sum="summary">
    <div class="count-number">
      <div class="count-number-quality">{{ count }} X</div>
      <div class="count-number-price">{{ Price }}р</div>
    </div>
    <div class="count-manipulate">
      <div class="count-manipulate-item minus" @click.prevent="count--"></div>
      <div class="count-manipulate-item plus" @click.prevent="count++"></div>
    </div>
  </div>
</template>

<script setup>
let count = ref("count");
count.value = 1;
let props = defineProps({
  Price: {
    type: Number,
  },
});

let summary = ref("");
let emit = defineEmits(["summary"]);
watch(count, (val, preVal) => {
  if (val <= 1) {
    count.value = 1;
  }

  summary.value = props.Price * count.value;
  emit("summary", summary);
});

onMounted(() => {
  summary.value=props.Price * count.value
  emit("summary", summary);
});
</script>

<style scoped lang="less">
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
