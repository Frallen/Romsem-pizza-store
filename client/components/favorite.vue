<template>
  <div class="star">
    <div
      class="star-item"
      v-if="isFavorite"
      @click.stop="favoriteAction(false)"
    >
      <nuxt-img src="Checked.png" class="star-img" />
    </div>
    <div class="star-item" v-else @click.stop="favoriteAction(true)">
      <nuxt-img src="unChecked.png" class="star-img" />
    </div>
  </div>
</template>

<script setup>
let props = defineProps({
  isFavorite: {
    default: false,
  },
});

let emit = defineEmits(["favoriteAction"]);
let favoriteAction = (data) => {
  data ? emit("favoriteAction", true) : emit("favoriteAction", false);
};
</script>

<style scoped lang="less">
.star {
  position: absolute;
  right: 5%;
  top: 2%;
  &-item {
    height: 30px;
    width: 30px;
  }
  &-img {
    width: 100%;
    height: 100%;
  }
}
</style>
