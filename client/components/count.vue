<template>
  <div class="count">
    <div class="count-item" @click.prevent="count--">-</div>
    <div class="count-item count-item-number"><input v-model.trim.number="count" type="text"></div>
    <div class="count-item" @click.prevent="count++">+</div>
  </div>
</template>

<script setup>
let count
</script>

<style scoped lang="less">
.count{
  display: flex;align-items: center;
  justify-content: space-between;
  text-align: center;
  &-item{

  }
}
</style>
