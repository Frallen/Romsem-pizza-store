<template>
  <div>
    <transition name="fade">
      <Preloader v-show="preloader"></Preloader
    ></transition>
    <Navbar
      @showMenu="showMenu"
      @showForm="showForm"
      :show="show"
      :searchStatus="search"
      @searchStatus="searchShow"
      :user="userState.user"
    ></Navbar>
    <transition name="fade">
      <Search v-show="search" @searchStatus="searchShow"></Search>
    </transition>
    <transition name="fade">
      <BackShadow v-show="show" @click="HideMenu"></BackShadow
    ></transition>
    <transition name="leftToRight"
      ><Menu v-show="menu" @HideMenu="HideMenu"></Menu
    ></transition>
    <div class="container">
      <div class="container-wrapper">
        <slot></slot>
      </div>
    </div>
    <PhoneWidget
      :PhoneNumber="index.Phones[0].attributes.MainNumber"
    ></PhoneWidget>
    <BasketWidget v-if="route.name !== 'basket'"></BasketWidget>
    <transition name="fade">
      <Auth @closeModal="HideMenu" v-show="modal" v-if="userState.user"></Auth
    ></transition>
  </div>
</template>

<script setup>
import { useCatalog } from "~/store/catalog";
import { useIndex } from "~/store";
import { useUser } from "~/store/user";
const route = useRoute();
let show = useState("show");
let search = useState("searchStatus");
let modal = useState("modal");
let menu = useState("Menu");

let userState = useUser();
const catalog = useCatalog();
const index = useIndex();
await catalog.getDeals();
await index.GetPhones();
await userState.Profile();
//console.log(catalog.catalogItems);

let preloader = computed(() => {
  return catalog.isLoading || index.isLoading || userState.isLoading;
});
watch(
  () => userState.user,
  () => {
    HideMenu();
  }
);
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

let showMenu = () => {
  show.value = true;
  menu.value = true;
};
let showForm = () => {
  modal.value = true;
  show.value = true;
};
let HideMenu = () => {
  show.value = false;
  modal.value = false;
  menu.value = false;
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
