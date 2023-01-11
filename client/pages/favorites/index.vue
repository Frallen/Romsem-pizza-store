<template>
  <Head>
    <Title>Избарнное</Title>
    <Meta name="description" :content="'Список ваших любимых блюд'" />
  </Head>
  <Offers
    :type="'Избранное'"
    :data="catalog.favoriteItems"
    v-if="catalog.favoriteItems.length"
  ></Offers>

  <div class="favorite-empty" v-else>
    <HeartOutlined class="heart" />
    <h3>Пока что в избранном пусто</h3>
  </div>
</template>

<script setup>
import { HeartOutlined } from "@ant-design/icons-vue";
import { useCatalog } from "~/store/catalog";
definePageMeta({
  middleware: "auth",
});
let catalog = useCatalog();
</script>

<style scoped lang="less">
.favorite-empty {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20vh;
  .heart {
    font-size: 5em;
    width: fit-content;
    display: block;
  }
  h3 {
    font-size: 2em;
  }
}
</style>
