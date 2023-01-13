<template>
  <div class="menu">
    <div class="menu-heading">
      <div class="menu-heading-title"><Logo></Logo>Romsem</div>
      <Icon class="close" name="gg:close" @click="Close" :size="'2.5em'" />
    </div>
    <div class="menu-nav" v-if="userState.isAuth">
      <NuxtLink class="menu-nav-item" to="/favorites/" @click="Close">
        <Icon name="clarity:heart-solid" :size="'1.4em'" class="icon" /><span
          >Избранное</span
        >
      </NuxtLink>
      <NuxtLink class="menu-nav-item" to="/orders/" @click="Close"
        ><Icon name="iconoir:shopping-bag" :size="'1.4em'" class="icon" /><span
          >Заказы</span
        >
      </NuxtLink>
      <NuxtLink class="menu-nav-item" to="/settings/" @click="Close"
        ><Icon
          name="clarity:settings-solid"
          :size="'1.4em'"
          class="icon"
        /><span>Настройки</span>
      </NuxtLink>
    </div>
    <div class="menu-wrapper">
      <h4>Меню</h4>
      <NuxtLink :to="'/category/пицца'" @click="Close" class="menu-item"
        ><Pizza></Pizza>Пицца</NuxtLink
      >
      <NuxtLink :to="'/category/сеты'" @click="Close" class="menu-item"
        ><Sets></Sets>Сеты</NuxtLink
      >
      <NuxtLink :to="'/category/Wok'" @click="Close" class="menu-item"
        ><Wok></Wok>Wok</NuxtLink
      >
      <NuxtLink :to="'/category/Роллы'" @click="Close" class="menu-item"
        ><Rols></Rols>Роллы</NuxtLink
      >
      <NuxtLink :to="'/category/Суши'" @click="Close" class="menu-item"
        ><Sushi></Sushi>Суши</NuxtLink
      >
      <NuxtLink :to="'/category/Салаты'" @click="Close" class="menu-item"
        ><Salats></Salats>Салаты</NuxtLink
      >
      <NuxtLink :to="'/category/Cупы'" @click="Close" class="menu-item"
        ><Soups></Soups>Супы</NuxtLink
      >
      <NuxtLink :to="'/category/Корндоги'" @click="Close" class="menu-item"
        ><Corndog></Corndog>Корн доги</NuxtLink
      >
      <NuxtLink :to="'/category/Вода'" @click="Close" class="menu-item"
        ><Water></Water>Напитки</NuxtLink
      >
      <NuxtLink to="/stock" class="menu-item" @click="Close"
        ><Actions></Actions>Акции</NuxtLink
      >
    </div>
    <NuxtLink
      class="menu-phone"
      :to="'tel:' + index.Phones[0].attributes.MainNumber"
      ><span>Звонок бесплатный</span>
      {{ index.Phones[0].attributes.MainNumber }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { useIndex } from "~/store";
import Logo from "assets/img/logo.svg";
import Pizza from "assets/img/pizza.svg";
import Wok from "assets/img/wok.svg";
import Sets from "assets/img/sets.svg";
import Rols from "assets/img/rols.svg";
import Sushi from "assets/img/Sushi.svg";
import Salats from "assets/img/salats.svg";
import Soups from "assets/img/soups.svg";
import Corndog from "assets/img/corndog.svg";
import Water from "assets/img/water.svg";
import Actions from "assets/img/actions.svg";
let emit = defineEmits(["HideMenu"]);
const index = useIndex();
let userState = useUser();

let Close = () => {
  emit("HideMenu", false);
};
</script>

<style scoped lang="less">
.menu {
  position: fixed;
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 6;
  background: #fff;
  padding: 20px 40px;
  left: 0;
  top: 0;
  height: 100%;
  @media @md {
    padding: 10px 25px;
    width: 100%;
  }
  &-nav {
    display: flex;
    flex-direction: column;
    &-item {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: @black;
      background: @gray;
      .br(10px);
      padding: 10px;
      width: 140px;
      margin-top: 1em;
      .icon {
        margin-left: 0;
        font-size: 1.3em;
      }
      span {
        margin-left: 10px;
        font-size: 1em;
      }
    }
  }
  &-phone {
    font-weight: 500;
    font-size: 1.5em;
    text-decoration: none;
    color: @orange;
    margin: 1em 0;
    .br(10px);
    padding: 10px;
    width: fit-content;
    border: 1px solid @orange;
    display: flex;
    flex-direction: column;
    span {
      display: block;
      margin-bottom: 10px;
    }
  }
  &-heading {
    display: flex;
    justify-content: space-between;

    &-title {
      display: flex;
      flex-direction: column;
      font-size: 1.5em;
      font-weight: 500;
      svg {
        margin-bottom: 10px;
      }
    }
    .close {
      position: relative;
      cursor: pointer;
    }
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    h4 {
      color: @black;
      margin-top: 10px;
    }
  }
  &-item {
    svg {
      margin-right: 20px;
    }
    display: flex;
    align-items: center;
    margin-top: 18px;
    text-decoration: none;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
    color: @black;
    .trs();
  }
  &-item:hover {
    color: @orange;
    .trs();
    svg {
      .trs();
      filter: invert(63%) sepia(98%) saturate(504%) hue-rotate(325deg)
        brightness(101%) contrast(108%);
    }
  }
}
</style>
