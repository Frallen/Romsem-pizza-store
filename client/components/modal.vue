<template>
  <div class="modal">
    <Icon
      name="gg:close"
      :size="'2.5em'"
      class="modal-close"
      @click="close()"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
let emit = defineEmits<{(e:"close",close:boolean):void}>();
let close = () => {
  emit("close", false);
};
</script>

<style scoped lang="less">
.modal {
  width: 421px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 1em;
  position: fixed;
  top: 21%;
  .postAbsolute();
  text-align: center;
  z-index: 6;
  @media @md {
    width: 320px;
    top: 5%;
  }
  &-wrapper {
    position: relative;
  }
  &-close {
    position: absolute;
    right: 4%;
    top: 4%;
    cursor: pointer;
  }
}
</style>
