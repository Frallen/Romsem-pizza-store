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

<script setup lang="ts">
import { catalogItemType } from "~/types/catalog.types";
interface PropsType {
  type: string;
  data: catalogItemType[];
}
let { type, data } = defineProps<PropsType>();
</script>

<style scoped lang="less">
.offers {
  margin: 25px 0 35px;
  @media @md {
    margin: 15px 0 25px;
  }

  &-wrapper {
    display: flex;
    margin-top: -15px;
    margin-left: -15px;
    flex-wrap: wrap;
    @media @sm {
      margin-left: 0;
    }
  }
  &-item {
    margin-top: 15px;
    margin-left: 15px;
    width: calc(100% / 4 - 15px);
    @media @lg {
      width: calc(100% / 3 - 15px);
    }
    @media @md {
      width: calc(100% / 2 - 15px);
    }
    @media @sm {
      width: calc(100%);
      margin-left: 0;
    }
  }
}
</style>
