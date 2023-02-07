<template>
  <Form :validation-schema="Schema" class="form" @submit="onSubmit">
    <slot></slot
  ></Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
let emit = defineEmits(["data"]);
let props = defineProps({
  Schema: {
    type: Object,
    required: true,
  },
});
let onSubmit = (data: Object, { resetForm }: any): void => {
  emit("data", data);
  resetForm()
};
</script>

<style scoped></style>
