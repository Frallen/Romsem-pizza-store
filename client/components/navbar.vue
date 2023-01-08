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
      <SearchOutlined
        class="navbar-actions-item navbar-actions-search"
        @click="showSearch"
      />
      <NuxtLink  class="navbar-actions-item " to="/favorites"><HeartFilled /></NuxtLink>
      <LogoutOutlined
        src="log-out.png"
        class="navbar-actions-item navbar-actions-logout"
        @click="logOut"
        v-if="Object.keys(user).length"
      />
      <LockOutlined
        class="navbar-actions-item navbar-actions-user"
        @click="showForm"
        v-else
      />
    </div>
  </div>
</template>

<script setup>
import Menu from "assets/img/menu.svg";
import Logo from "assets/img/logo.svg";
import { useUser } from "~/store/user";
import {
  HeartFilled,
  LockOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
let props = defineProps({
  show: { type: Boolean, default: false },
  searchStatus: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
  },
});
let emit = defineEmits(["showMenu", "searchStatus", "showForm", "HideMenu"]);
let showForm = () => {
  emit("showForm", true);
};
let logOut = () => {
  useUser().logout();
  emit("HideMenu", true);
};
let showSearch = () => {
  props.searchStatus ? emit("searchStatus", false) : emit("searchStatus", true);
};
let showMenu = () => {
  props.show ? emit("HideMenu", true) : emit("showMenu", true);
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
    svg {
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
    align-items: center;
    width: 10%;
    &-item {
      margin-right: 13px;
      cursor: pointer;
      user-select: none;
      font-size: 1.6em;
      text-decoration: none;
      color: @black;
    }
    &-item:last-child {
      margin-right: 0;
    }
  }
}
</style>
