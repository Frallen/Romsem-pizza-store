<template>
  <div class="star">
    <div
      class="star-item"
      v-if="isFavorite"
      @click.stop="favoriteAction(false)"
    >
      <Icon name="clarity:heart-solid" :size="'1.6em'" class="check" />
    </div>
    <div class="star-item" v-else @click.stop="favoriteAction(true)">
      <Icon name="clarity:heart-line" :size="'1.6em'" class="uncheck" />
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
    .check {
      color: @red;
    }
    .check,
    .uncheck {
      font-size: 1.3em;
    }
  }
}
</style>
