<template>
<input class="input">
</template>

<script>
export default {
  name: "DefaultInput"
}
</script>

<style scoped lang="less">
.input{
  outline: none;
  .br(5px);
  padding: 8px 9px;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: @gray;
  overflow: hidden;
  background: #fff;
  border:none;
}
</style>