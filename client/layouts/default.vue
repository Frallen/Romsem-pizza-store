<template>
  <div>
    <Preloader v-show="catalog.isLoading || index.isLoading"></Preloader>
    <Navbar
      @showMenu="showMenu"
      :show="show"
      :searchStatus="search"
      @searchStatus="searchShow"
    ></Navbar>
    <transition name="fade">
      <Search v-show="search" @searchStatus="searchShow"></Search>
    </transition>
    <transition name="fade">
      <BackShadow v-show="show" @click="HideMenu"></BackShadow
    ></transition>
    <transition name="leftToRight"
      ><Menu v-show="show" @showMenu="showMenu"></Menu
    ></transition>
    <div class="container">
      <div class="container-wrapper">
        <slot></slot>
      </div>
    </div>
    <Footer></Footer>
    <PhoneWidget
      :PhoneNumber="index.Phones[0].attributes.MainNumber"
    ></PhoneWidget>
    <BasketWidget v-if="route.name !== 'basket'"></BasketWidget>
  </div>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
import { useIndex } from "~/store";
const catalog = useCatalog();
const index = useIndex();
await catalog.getDeals();
await index.GetPhones();
console.log(catalog.catalogItems);
const route = useRoute();
let show = useState("show");
let search = useState("searchStatus");

let searchShow = (value) => {
  if (value) {
    search.value = true;
    if (window.matchMedia("(max-width: 575.98px)").matches) {
      document.querySelector("body").style.overflow = "hidden";
    }
  } else {
    search.value = false;
    document.querySelector("body").style.overflow = "visible";
  }
};

let showMenu = (value) => {
  value ? (show.value = true) : (show.value = false);
};
let HideMenu = () => {
  show.value = false;
};
</script>
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.leftToRight-enter-active,
.leftToRight-leave-active {
  .trs();
}
.leftToRight-enter-from {
  transform: translateX(-100%);
}
.leftToRight-leave-to {
  transform: translateX(0);
}
.leftToRight-leave-from {
  transform: translateX(0);
}
.leftToRight-leave-to {
  transform: translateX(-100%);
}
.leftToRight-enter-from,
.leftToRight-leave-to {
  opacity: 0;
}
</style>