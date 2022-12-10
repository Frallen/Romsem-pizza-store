<template>
  <div class="slider">
    <swiper
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
      <swiper-slide
      ><NuxtLink><img src="" /></NuxtLink
      ></swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide, } from "swiper/vue";
import { Navigation } from 'swiper';
import "swiper/css";
import 'swiper/less/navigation';

let props = defineProps({
  actions: {
    type: Array,
  },
});
let emit = defineEmits([]);
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
let modules=[Navigation]
</script>

<style scoped lang="less">
.slider {
  margin: 30px 0 25px;
}
</style>
