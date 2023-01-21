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
      <SwiperSlide
        class="slider-item"
        v-for="item in IndexReducer.MainSliderData"
        :key="item.id"
        ><NuxtLink
          ><NuxtImg
          provider="cloudinary"
            :src="
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