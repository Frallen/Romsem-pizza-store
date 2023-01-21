<template>
  <div class="offers">
    <h2>{{ type }}</h2>
    <div class="offers-wrapper">
      <div class="offers-item" :key="item.id" v-for="item in data">
        <CatalogItem :catalogItem="item"></CatalogItem>
      </div>
    </div>
  </div>
</template>

<script setup>
let props = defineProps({
  type: {
    type: String,
  },
  data: {
    type: Array,
  },
});
</script>

<style scoped lang="less">
.offers {
  margin: 25px 0 35px;
  @media @md {
    margin: 15px 0 25px;
  }

  &-wrapper {
    display: flex;
    margin-top: -10px;
    margin-left: -10px;
    flex-wrap: wrap;
    @media @sm {
      margin-left: 0;
    }
  }
  &-item {
    margin-top: 10px;
    margin-left: 10px;
    width: calc(100% / 4 - 10px);
    @media @lg {
      width: calc(100% / 3 - 10px);
    }
    @media @md {
      width: calc(100% / 2 - 10px);
    }
    @media @sm {
      width: calc(100%);
      margin-left: 0;
    }
  }
}
</style>
