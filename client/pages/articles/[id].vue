<template>
  <div class="article shadow">
    <h2 class="article-title">{{ article.attributes.Title }}</h2>
    <div v-html="toRaw"></div>
  </div>
</template>

<script lang="ts" setup>
import { marked } from "marked";
import { useIndex } from "~/store";
import { ArticlesType } from "~/types/index.types";

let id = useRoute().params.id as string;
let Index = useIndex();
let article = (await Index.getArticle(parseInt(id))) as ArticlesType;
let toRaw = computed<string>(() => marked(article.attributes.Text));
</script>

<style scoped lang="less">
.article {
  max-width: 1100px;
  margin: 1em auto;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
}
</style>
