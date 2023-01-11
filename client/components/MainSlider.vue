<template>
  <div class="slider">
    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 3000,
      }"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="slider-wrapper"
    >
      <SwiperSlide
        class="slider-item"
        v-for="item in IndexReducer.MainSliderData"
        :key="item.id"
        ><NuxtLink
          ><img
            :src="
              config.public.strapi.url +
              item.attributes.Image.data.attributes.url
            " /></NuxtLink
      ></SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { useIndex } from "~/store/index";
const config = useRuntimeConfig();
let IndexReducer = useIndex();
let props = defineProps({});
let emit = defineEmits([]);
const onSwiper = (swiper) => {
  //console.log(swiper);
};
const onSlideChange = () => {
  //console.log("slide change");
};
IndexReducer.getSlides();
//console.log(IndexReducer.MainSliderData)
</script>

<style scoped lang="less">
.slider {
  margin: 30px 0 25px;
  &-wrapper {
    max-height: 450px;
  }
  &-item {
    overflow: hidden;
    .br(10px);
    a {
      text-decoration: none;
      display: block;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
