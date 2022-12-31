<template>
  <Modal @close="emit('closeModal', false)">
    <Form :validation-schema="useSchemaReg()" class="form" v-if="typeForm"  @submit="onSubmit">
      <h3>Регистрация</h3>
      <label for="userName" class="form-item">
        <span>Имя пользователя</span>
        <Field name="userName" id="userName" class="input" type="text" />
        <ErrorMessage name="userName" class="error" />
      </label>
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
      <div class="form-state" @click.stop="typeForm = false">
        Авторизация
      </div></Form
    >
    <Form v-else :validation-schema="useSchemaAuth()" class="form" @submit="onSubmit">
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
import { useSchemaReg, useSchemaAuth } from "~/composables/useSchema";
import { useUser } from "~/store/user";
const user = useUser();
let emit = defineEmits(["closeModal"]);
let typeForm = useState("typeForm");
typeForm.value = true;
let onSubmit=(data)=>{

  data.userName?user.createUser(data):user.authUser(data)
}
</script>

<style scoped></style>
