<template>
  <div class="articles">
    <div class="articles-wrapper">
      <NuxtLink
        class="articles-item"
        v-for="item in index.Articles"
        :to="'/articles/' + item.id"
        ><NuxtImg
          provider="cloudinary"
          :src="item.attributes.SliderImage.data.attributes.url"
        />
        <h4 class="articles-item-title">{{ item.attributes.Title }}</h4>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIndex } from "~/store";

const index = useIndex();
</script>

<style scoped lang="less">
.articles {
  margin: 2em 0;
  &-wrapper {
    margin-left: -15px;
    margin-top: -15px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    @media @md {
      margin-left: 0;
    }
  }
  &-item {
    margin-left: 15px;
    margin-top: 15px;
    text-decoration: none;
    width: calc(100% / 4 - 15px);
    position: relative;
    overflow: hidden;
    max-height: 250px;
    @media @lg {
      width: calc(100% / 3 - 15px);
    }
    @media @md {
      width: calc(100% / 2 - 15px);
    }
    @media @md {
      width: calc(100%);
      margin-left: 0;
    }
    .br(10px);
    &-title {
      position: absolute;
      bottom: 15px;
      left: 10px;
      .text-eclipse(2);
      max-height: 100px;
      overflow: hidden;
      @media @xs {
        font-size: 1em;
      }
    }
    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }
}
</style>
