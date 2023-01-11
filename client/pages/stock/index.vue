<template>
  <Head>
    <Title>Акции</Title>
    <Meta name="description" :content="'Список проводимых акции. Скидкки,акции'" />
  </Head>
  <Offers
    :type="'Акции'"
    :data="catalog.filteredStock"
    v-if="catalog.filteredStock.length"
  ></Offers>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
let catalog = useCatalog();
</script>

<style scoped></style>
