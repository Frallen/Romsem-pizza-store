<template>
  <div class="orders">
    <OrderItem
      v-for="item in catalog.orders"
      :key="item.id"
      :item="item"
    ></OrderItem>
  </div>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";

let catalog = useCatalog();
definePageMeta({
  middleware: "auth",
});
await catalog.userOrders();
</script>

<style scoped lang="less">
.orders {
  display: flex;
  flex-direction: column;
}
</style>
