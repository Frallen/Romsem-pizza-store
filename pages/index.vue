<template>
  <div v-for="item in catalog.getDeals()">{{ item.Title }}</div>
  <DefaultButton>frfr</DefaultButton>
</template>

<script setup>
import {useCatalog} from "../store/catalog";
const catalog = useCatalog()

</script>

<style lang="less"></style>
