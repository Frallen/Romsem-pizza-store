<template>
  <div>
    <h2>Мои отзывы</h2>
    <div class="reviews">
      <div v-if="userState.usersReviews" class="reviews-body">
        <NuxtLink
          :to="
            '/catalog/' +
            useSlug(item.attributes.catalog_item.data.attributes.Title) +
            '/' +
            item.attributes.catalog_item.data.id
          "
          class="reviews-body-item review-shadow"
          v-for="item in userState.usersReviews"
          :key="item.id"
        >
          <div class="review-head">
            <div class="owner">
              {{ item.attributes.Owner.data.attributes.FI }}
            </div>
            <div class="date">
              {{
                moment(item.attributes.Owner.data.attributes.createdAt).format(
                  "DD.MM.YYYY"
                )
              }}
            </div>
          </div>
          <h6>{{ item.attributes.Title }}</h6>
          <p>{{ item.attributes.Text }}</p>
        </NuxtLink>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { useUser } from "~/store/user";
import moment from "moment";
let userState = useUser();

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped lang="less">
.reviews {
  &-body {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-top: -15px;
    flex-direction: row;
    &-item {
      margin-left: 10px;
      margin-top: 10px;
      text-decoration: none;
      display: block;
      color: @black;
      width: calc(100% / 4 - 15px);
      @media @lg {
        width: calc(100% / 3 - 15px);
      }
      @media @md {
        width: calc(100% / 2 - 15px);
      }
      @media @xs {
        width: calc(100%);
        margin-left: 0;
        margin-top: 1em;
      }
      p {
        .text-eclipse(3);
        overflow: hidden;
      }
    }
  }
}
</style>
