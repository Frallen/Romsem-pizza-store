<template>
  <div class="size-wrapper">
    <div
      class="size-item"
      :class="{ 'size-item-active': status === item.id }"
      v-for="item in size.data"
      @click.stop="changeSize(item.attributes.Size, item.id)"
      :key="item.id"
      :id="item.id"
    >
      {{ modifiedSize(item.attributes.Size) }}
    </div>
  </div>
</template>
<script setup lang="ts">
let emit = defineEmits<{ (e: "selectedSize", size: string): void }>();
interface PropsType {
  size?: object;
}
let props = defineProps<PropsType>();
let status = ref<number>();
status.value = 1;
let selectedSize = useState<string>("Маленькая");
selectedSize.value = "Маленькая";

watch(
  () => selectedSize.value,
  () => {
    emit("selectedSize", selectedSize.value);
  }
);
onMounted(() => {
  emit("selectedSize", selectedSize.value);
});

let modifiedSize = (val: string) => {
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
};
let changeSize = (size: string, id: number) => {
  selectedSize.value = size;
  status.value = id;
};
</script>

<style scoped lang="less">
.size-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  background: #a4acad6b;
  .br(15px);
  overflow: hidden;
}
.size-item {
  overflow: hidden;
  border: 2px solid transparent;
  padding: 5px;
  cursor: pointer;
  text-align: center;
  flex: 1 0 auto;
  .trs();
  .br(15px);
}
.size-item-active {
  background: #fff;
  border: 2px solid @orange;
  text-align: center;
  .trs();
}
</style>
