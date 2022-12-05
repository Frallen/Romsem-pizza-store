<template>
  <div class="navbar">
    <div class="navbar-hamburger" @click="showMenu">
      <Menu></Menu>
      <span>Меню</span>
    </div>
    <div class="navbar-logo">
      <NuxtLink to="/"><Logo></Logo>Romsem</NuxtLink>
    </div>
    <div class="navbar-phone">
      <NuxtLink to="tel:+996 705 188 955">+996 705 188 955 </NuxtLink>
    </div>
    <div class="navbar-actions">
      <Search class="navbar-actions-search"></Search>
    </div>
  </div>
</template>

<script setup>
import Menu from "../assets/img/menu.svg";
import Logo from "../assets/img/logo.svg";
import Search from "../assets/img/search.svg";
let props = defineProps({
  show: { type: Boolean, default: false },
});
let emit = defineEmits(["showMenu"]);
let showMenu = () => {
  props.show ? emit("showMenu", true) : emit("showMenu", true);
};
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 1.875em;
  &-hamburger,
  &-logo {
    cursor: pointer;
    svg {
      width: 45px;
      height: 45px;
    }
  }
  &-hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    svg {
      margin-right: 10px;
    }
    span {
      display: block;
      @media @md {
        display: none;
      }
    }
  }
  &-logo {
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: @black;
      font-size: 2em;
      font-weight: 600;
      @media @md {
        font-size: 1.5em;
      }
      svg {
        margin-right: 10px;
      }
    }
  }
  &-phone {
    @media @md {
      display: none;
    }
    a {
      display: block;
      text-decoration: none;
      color: @black;
      font-size: 1.25em;
    }
  }
  &-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-search {
      cursor: pointer;
    }
  }
}
</style>
