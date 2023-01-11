<template>
  <div class="slider">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="slider-wrapper"
    >
      <swiper-slide
        class="slider-item"
        v-for="item in IndexReducer.MainSliderData"
        :key="item.id"
        ><NuxtLink
          ><img
            :src="
              config.public.strapi.url +
              item.attributes.Image.data.attributes.url
            " /></NuxtLink
      ></swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation,Autoplay } from "swiper";
import "swiper/css";
import "swiper/less/navigation";
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
let modules = [Navigation,Autoplay];
onMounted(() => {});
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
