<template>
  <div>
    <Navbar @showMenu="showMenu" :show="show"></Navbar>
    <transition name="fade">
      <BackShadow v-show="show" @click="HideMenu"></BackShadow
    ></transition>
    <transition name="leftToRight"
      ><Menu v-show="show" @showMenu="showMenu"></Menu
    ></transition>
    <div class="container">
      <slot></slot>
    </div>
    <BasketWidget v-if="route.name!=='basket'"></BasketWidget>
  </div>
</template>

<script setup>

const route = useRoute()
let show = useState('show');
let showMenu = (value) => {
  value ? (show.value = true) : (show.value = false);
};
let HideMenu = () => {
  show.value= false;
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
