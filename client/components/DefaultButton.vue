<template>
  <button class="button"><slot></slot></button>
</template>

<script setup></script>

<style scoped lang="less">
.button {
  background: @orange;
  color: #fff;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
}
.button:hover {
  box-shadow: 0 2px 10px rgb(215 68 0 / 40%);
}
</style>
