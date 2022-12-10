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
    <BasketWidget></BasketWidget>
  </div>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showMenu(value) {
      value ? (this.show = true) : (this.show = false);
    },
    HideMenu() {
      this.show = false;
    },
  },
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
