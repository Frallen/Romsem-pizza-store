<template>
  <offers :type="id.toString()"></offers>
</template>

<script setup>
let route = useRoute();
const id = route.params.slug;
</script>

<style scoped lang="less"></style>
