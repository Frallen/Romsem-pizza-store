<template>
  <button class="button"><slot></slot></button>
  <DefaultInput></DefaultInput>
</template>

<script>
export default {
  name: "DefaultButton",
};
</script>

<style scoped lang="less">
.button {
  background: @orange;
  .br(5px);
  display: block;
  width: 100%;
  padding: 5px 28px;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
}
</style>
