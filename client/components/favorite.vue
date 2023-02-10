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

<script setup lang="ts">
import { useUser } from "~/store/user";
interface PropsType {
  isFavorite: boolean;
  id: number;
}
let { id, isFavorite } = defineProps<PropsType>();
let userState = useUser();

let favoriteAction = (data: boolean) => {
  data
    ? userState.updateFavorites(id, true)
    : userState.updateFavorites(id, false);
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
