<template>
  <div class="empty">
    <div class="empty-box">
      <h1>Упс..</h1>
      <p>Что-то пошло не так</p>
      <DefaultButton @click.stop="handleError()">На главную</DefaultButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>

<style scoped lang="less">
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 35%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  &-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
