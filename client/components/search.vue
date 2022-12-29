<template>
  <div class="search" :class="{ show: searchStatus }">
    <div class="search-head">
      <input
        v-model.trim="search"
        type="text"
        class="input"
        placeholder="Название блюда"
      /><Close @click="hide"></Close>
    </div>
    <div class="search-wrapper">
      <NuxtLink
        :to="'/catalog/' + useSlug(item.attributes.Title) + '/' + item.id"
        class="search-item"
        v-for="item in catalog.searchedItems(search)"
        @click="hide"
      >
        <div class="search-item-img">
          <img
            :src="
              config.public.env.STRAPI_URL +
              item.attributes.Image.data.attributes.url
            "
          />
        </div>
        <h5 class="search-item-title">{{ item.attributes.Title }}</h5>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
import Close from "assets/img/close.svg";
const config = useRuntimeConfig();
const catalog = useCatalog();
let emit = defineEmits(["searchStatus"]);
let search = useState("search");
let props = defineProps({
  searchStatus: {
    type: Boolean,
    default: false,
  },
});
let hide = () => {
  emit("searchStatus", false);
};
</script>

<style scoped lang="less">
.search {
  position: fixed;
  right: 3%;
  top: 10%;
  .br(10px);
  width: 300px;
  background: #fff;
  box-shadow: 0 0 5px 0 #000;
  z-index: 5;
  padding: 10px;
  @media @sm{
    .br(0);
    right: 0;
    top: 0;
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

    max-height: 350px;
    @media @sm{
      max-height: 450px;
    }
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
