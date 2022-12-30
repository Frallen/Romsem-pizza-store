<template>
  <div class="navbar">
    <div class="navbar-hamburger" @click="showMenu">
      <Menu></Menu>
      <span>Меню</span>
    </div>
    <div class="navbar-logo">
      <NuxtLink to="/"><Logo></Logo>Romsem</NuxtLink>
    </div>
    <div class="navbar-actions">
      <User class="navbar-actions-user" @click="showForm"></User>
      <Search class="navbar-actions-search" @click="showSearch"></Search>
    </div>
  </div>
</template>

<script setup>
import Menu from "assets/img/menu.svg";
import Logo from "assets/img/logo.svg";
import User from "assets/img/user.svg";
import Search from "assets/img/search.svg";
let props = defineProps({
  show: { type: Boolean, default: false },
  searchStatus: {
    type: Boolean,
    default: false,
  },
});
let emit = defineEmits(["showMenu", "searchStatus", "showForm"]);
let showForm = () => {
  emit("showForm", true);
};
let showSearch = () => {
  props.searchStatus ? emit("searchStatus", false) : emit("searchStatus", true);
};
let showMenu = () => {
  props.show ? emit("showMenu", false) : emit("showMenu", true);
};
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 1em;
  position: sticky;
  top: 0;
  z-index: 3;
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
    font-size: 1.5em;
    width: 10%;
    svg {
      min-width: 45px;
      margin-right: 10px;
      @media @md {
        margin-right: 0;
      }
    }
    span {
      display: block;
      @media @md {
        display: none;
      }
    }
  }
  &-logo {
    width: 80%;
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: @black;
      font-size: 2em;
      font-weight: 600;
      @media @md {
        font-size: 1.2em;
        flex-direction: column;
      }
      svg {
        margin-right: 10px;
      }
    }
  }
  &-actions {
    display: flex;
    justify-content: flex-end;
    width: 10%;
    &-search {
      cursor: pointer;
    }
    &-user{
      height: 40px;
      width: 40px;
    }
  }
}
</style>
