<template>
  <Modal @close="emit('closeModal', false)">
    <useForm
      :Schema="useSchemaReg()"
      class="form"
      v-if="!typeForm"
      @data="onSubmit"
    >
      <h3>Регистрация</h3>
      <label for="userName" class="form-item">
        <span>Имя пользователя</span>
        <Field
          name="userName"
          id="userName"
          class="input"
          type="text"
          v-slot="{ valid, meta, field }"
        >
          <input
            v-bind="field"
            class="input"
            :class="{ 'input-error': meta.touched && !meta.valid }"
        /></Field>
        <ErrorMessage name="userName" class="error" />
      </label>
      <label for="email" class="form-item">
        <span>Почта</span>
        <Field
          name="email"
          id="email"
          class="input"
          type="email"
          v-slot="{ valid, meta, field }"
        >
          <input
            v-bind="field"
            class="input"
            :class="{ 'input-error': meta.touched && !meta.valid }"
        /></Field>
        <ErrorMessage name="email" class="error" />
      </label>
      <label for="password" class="form-item">
        <span>Пароль</span>
        <Field
          name="password"
          id="password"
          class="input"
          type="password"
          v-slot="{ valid, meta, field }"
        >
          <input
            v-bind="field"
            class="input"
            :class="{ 'input-error': meta.touched && !meta.valid }"
        /></Field>
        <ErrorMessage name="password" class="error" />
      </label>
      <DefaultButton>Зарегистрироваться</DefaultButton>
      <div class="form-state" @click.stop="typeForm = true">
        Авторизоваться
      </div></useForm
    >
    <useForm v-else :Schema="useSchemaAuth()" class="form" @data="onSubmit">
      <h3>Авторизация</h3>
      <label for="email" class="form-item">
        <span>Почта</span>
        <Field
          name="email"
          id="email"
          type="email"
          v-slot="{ valid, meta, field }"
          ><input
            v-bind="field"
            class="input"
            :class="{ 'input-error': meta.touched && !meta.valid }"
        /></Field>
        <ErrorMessage name="email" class="error" />
      </label>
      <label for="password" class="form-item">
        <span>Пароль</span>
        <Field
          name="password"
          id="password"
          type="password"
          v-slot="{ valid, meta, field }"
        >
          <input
            v-bind="field"
            class="input"
            :class="{ 'input-error': meta.touched && !meta.valid }"
          />
        </Field>
        <ErrorMessage name="password" class="error" />
      </label>
      <DefaultButton>Войти</DefaultButton>
      <div class="form-state" @click.stop="typeForm = false">
        Зарегистрироваться
      </div>
    </useForm>
  </Modal>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { useSchemaReg, useSchemaAuth } from "~/composables/useSchema";
import { useUser } from "~/store/user";
import { AuthType } from "~/types/user.types";

const user = useUser();
let emit = defineEmits<{ (e: "closeModal", close: boolean): void }>();
let typeForm = useState<boolean>();
typeForm.value = true;
let onSubmit = async (data: AuthType) => {
  data.userName
    ? await user.createUser(data).then(() => user.Profile())
    : await user.authUser(data).then(() => user.Profile());
};
</script>

<style scoped></style>
