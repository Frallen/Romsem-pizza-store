<template>
  <Form :validation-schema="Schema" class="form" @submit="onSubmit">
    <slot></slot
  ></Form>
</template>

<script setup>
import { Form } from "vee-validate";
let emit = defineEmits(["data"]);
let props = defineProps({
  Schema: {
    type: Object,
    required: true,
  },
});
let onSubmit = async (data, { resetForm }) => {
  emit("data", data);
};
</script>

<style scoped></style>
