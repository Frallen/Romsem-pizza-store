<template>
  <div class="size-wrapper">
    <div
      class="size-item"
      :class="{ 'size-item-active': status === item.id }"
      v-for="item in size.data"
      @click.prevent="changeSize(item.attributes.Size, item.id)"
      :key="item.id"
      :id="item.id"
    >
      {{ modifiedSize(item.attributes.Size) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "selectSize",
  emits: ["selectedSize"],
  data() {
    return { status: 1, selectedSize: "Маленькая" };
  },
  props: {
    size: {
      type: Object,
    },
  },
  watch: {
    selectedSize() {

      this.$emit("selectedSize", this.selectedSize);
    },
  },
  methods: {
    modifiedSize(val) {
      switch (val) {
        case "Маленькая": {
          return "26 СМ";
        }
        case "Средняя": {
          return "30 СМ";
        }
        case "Большая": {
          return "40 СМ";
        }
      }
    },
    changeSize(size, id) {
      this.selectedSize=size
      this.status = id;
    },
  },
};
</script>

<style scoped lang="less">
.size-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}
.size-item {
  background: #a4acad6b;
  overflow: hidden;
  border: 2px solid transparent;
  padding: 5px;
  cursor: pointer;
  text-align: center;
  flex: 1 0 auto;
  .trs();
}
.size-item-active {
  background: #fff;
  border: 2px solid @orange;
  text-align: center;
  .trs();
}
</style>
