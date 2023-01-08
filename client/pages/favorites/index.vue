<template>
  <Offers
    :type="'Избранное'"
    :data="catalog.favoriteItems"
    v-if="catalog.favoriteItems.length"
  ></Offers>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
let catalog = useCatalog();
</script>

<style scoped lang="less"></style>
