<template>
  <div class="modal">
    <div class="modal-wrapper">
      <Close class="modal-close" @click="close()"></Close>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Close from "~/assets/img/close.svg";

let props = defineProps({});
let emit = defineEmits(["close"]);
let close = () => {
  emit("close", false);
};
</script>

<style scoped lang="less">
.modal {
  min-height: 480px;
  width: 421px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  position: fixed;
  top: 21%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 6;
  &-wrapper {
    position: relative;
  }
  &-close {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
}
</style>
