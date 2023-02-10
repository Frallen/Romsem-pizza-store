<template>
  <div class="slider">
    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="3"
      :space-between="10"
      :loop="true"
      :breakpoints="{
        998: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 30,
        },

        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
      }"
      :autoplay="{
        delay: 3000,
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="slider-wrapper"
    >
      <SwiperSlide class="slider-item" v-for="item in slides" :key="item.id"
        ><NuxtLink
          ><NuxtImg
            provider="cloudinary"
            :src="item.attributes.Image.data.attributes.url" /></NuxtLink
      ></SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { MainSliderType } from "~/types/index.types";
interface PropsType {
  slides: MainSliderType[];
}
let { slides } = defineProps<PropsType>();
const onSwiper = (swiper: any) => {
  //console.log(swiper);
};
const onSlideChange = () => {
  //console.log("slide change");
};
</script>

<style scoped lang="less">
.slider {
  margin: 30px 0 25px;
  &-wrapper {
    max-height: 450px;
  }
  &-item {
    overflow: hidden;
    .br(15px);
    a {
      text-decoration: none;
      display: block;
      overflow: hidden;
      height: 100%;
      .br(15px);
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
