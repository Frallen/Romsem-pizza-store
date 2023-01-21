<template>
  <div class="star">
    <div
      class="star-item"
      v-if="isFavorite"
      @click.stop="favoriteAction(false)"
    >
      <Icon name="clarity:heart-solid" :size="'1.4em'" class="check" />
    </div>
    <div class="star-item" v-else @click.stop="favoriteAction(true)">
      <Icon name="clarity:heart-line" :size="'1.4em'" class="uncheck" />
    </div>
  </div>
</template>

<script setup>
import { useUser } from "~/store/user";
let props = defineProps({
  isFavorite: {
    default: false,
  },
  id:{
    type:Number,
    required:true
  }
});
let userState = useUser();

let favoriteAction = (data) => {
  data
    ? userState.updateFavorites(props.id, true)
    : userState.updateFavorites(props.id, false);
};
</script>

<style scoped lang="less">
.star {
  position: absolute;
  right: 5%;
  top: 2%;
  cursor: pointer;
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
