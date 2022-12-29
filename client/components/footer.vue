<template>
  <div class="footer">
    <div class="footer-wrapper container">
      <div class="footer-item"><Logo class="footer-logo"></Logo></div>
      <div class="footer-item">
        <NuxtLink to="/about">О нас</NuxtLink>
      </div>
      <div class="footer-item"><NuxtLink to="/reviews">Отзывы</NuxtLink></div>
      <div class="footer-item">
        <NuxtLink
          class="menu-phone"
          :to="'tel:' + index.Phones[0].attributes.MainNumber"
          >{{ index.Phones[0].attributes.MainNumber }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from "assets/img/logo.svg";
import { useIndex } from "~/store";
const index = useIndex();
</script>

<style scoped lang="less">
.footer {
  background: #fff;

  &-wrapper {
    padding-top: 1em;
    padding-bottom: 1em;
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    display: flex;
    flex-direction: column;
    color: @black;
    width: calc(100% / 5);
    a {
      margin-top: 10px;
      text-decoration: none;
      font-size: 1em;
      font-weight: 600;
      color: @black;
    }
    a:first-child {
      margin-top: 0;
    }
  }
}
</style>
