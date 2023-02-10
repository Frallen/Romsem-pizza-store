<template>
  <div class="search">
    <div class="search-head">
      <input
        v-model.trim="search"
        type="text"
        class="input"
        placeholder="Название блюда"
      />
      <Icon class="close" @click="hide" name="gg:close" :size="'1.8em'" />
    </div>
    <div class="search-wrapper">
      <NuxtLink
        :to="'/catalog/' + useSlug(item.attributes.Title) + '/' + item.id"
        class="search-item"
        v-for="item in catalog.searchedItems(search)"
        @click="hide"
      >
        <div class="search-item-img">
          <NuxtImg
            provider="cloudinary"
            :src="item.attributes.Image.data.attributes.url"
          />
        </div>
        <h5 class="search-item-title">{{ item.attributes.Title }}</h5>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalog } from "~/store/catalog";
const config = useRuntimeConfig();
const catalog = useCatalog();
let emit = defineEmits<{ (e: "searchStatus", searchStatus: boolean): void }>();
let search = useState("search");

let hide = () => {
  emit("searchStatus", false);
};
</script>

<style scoped lang="less">
.search {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 300px;
  background: #fff;
  box-shadow: 0 0 5px 0 #000;
  z-index: 6;
  padding: 15px 10px;
  @media @sm {
    width: 100%;
    height: 100%;
  }
  &-head {
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input {
      width: 80%;
    }
    svg {
      cursor: pointer;
    }
  }

  &-wrapper {
    overflow: auto;
    max-height: 90%;
    @media @sm {
    }
  }
  &-wrapper::-webkit-scrollbar-thumb {
    background: @orange;
    .br(10px);
  }
  &-wrapper::-webkit-scrollbar-track {
    background-color: @gray-price;
    .br(10px);
  }
  &-wrapper::-webkit-scrollbar {
    width: 10px;
  }
  &-item {
    display: flex;
    text-decoration: none;
    align-items: center;
    margin-top: 10px;
    &-img {
      height: 50px;
      width: 50px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    h5 {
      color: initial;
      margin-left: 1em;
      font-size: 1.1em;
      word-break: break-word;
    }
  }
  &-item:first-child {
    margin-top: 0;
  }
}

.show {
  visibility: visible;
}
</style>
