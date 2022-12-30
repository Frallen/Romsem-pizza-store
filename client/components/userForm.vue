<template>
  <Modal @close="emit('closeModal', false)">
    <Form :validation-schema="useSchema()" class="form" v-if="typeForm">
      <h3>Регистрация</h3>
      <label for="email" class="form-item">
        <span>Почта</span>
        <Field name="email" id="genre" class="input" type="email" />
        <ErrorMessage name="email" class="error" />
      </label>
      <label for="password" class="form-item">
        <span>Пароль</span>
        <Field name="password" id="password" class="input" type="password" />
        <ErrorMessage name="password" class="error" />
      </label>
      <DefaultButton>Зарегистрироваться</DefaultButton>
      <div class="form-state" @click.stop="typeForm = false">Авторизация</div
    ></Form>
    <Form v-else :validation-schema="useSchema()" class="form">
      <h3>Авторизация</h3>
      <label for="email" class="form-item">
        <span>Почта</span>
        <Field name="email" id="genre" class="input" type="email" />
        <ErrorMessage name="email" class="error" />
      </label>
      <label for="password" class="form-item">
        <span>Пароль</span>
        <Field name="password" id="password" class="input" type="password" />
        <ErrorMessage name="password" class="error" />
      </label>
      <DefaultButton>Авторизоваться</DefaultButton>
      <div class="form-state" @click.stop="typeForm = true">Регистрация</div>
    </Form>
  </Modal>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useSchema } from "~/composables/useSchema";

let emit = defineEmits(["closeModal"]);
let typeForm = useState("typeForm");
typeForm.value = true;
</script>

<style scoped></style>
