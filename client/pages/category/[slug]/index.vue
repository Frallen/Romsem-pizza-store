<template>
  <Head
    ><Title>{{ id.toString().toLocaleUpperCase() }}</Title></Head
  >
  <Offers
    :type="id.toString()"
    :data="catalog.sortedCategories(id.toString())"
    v-if="catalog.sortedCategories(id.toString()).length"
  ></Offers>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";

let route = useRoute();
const id = route.params.slug;
let catalog = useCatalog();
</script>

<style scoped lang="less"></style>
