<template>
  <h2>Настройки</h2>
  <div class="setting">
    <div class="setting-item shadow">
      <h5>Информация</h5>
      <useForm :Schema="useInfo()" class="form" @data="onSubmit">
        <label for="userName" class="form-item">
          <span>Имя пользователя</span>
          <Field name="userName" id="userName" class="input" type="text" />
          <ErrorMessage name="userName" class="error" />
        </label>
        <label for="email" class="form-item">
          <span>Почта</span>
          <Field name="email" id="email" class="input" type="email" />
          <ErrorMessage name="email" class="error" />
        </label>
        <DefaultButton>Обновить</DefaultButton>
      </useForm>
    </div>
    <div class="setting-item">
      <h5>Смена пароля</h5>
      <useForm :Schema="usePassword()" class="form" @data="onUpdatePassword">
        <label for="CurrentPassword" class="form-item">
          <span>Текущий пароль</span>
          <Field
            name="CurrentPassword"
            id="CurrentPassword"
            class="input"
            type="password"
          />
          <ErrorMessage name="CurrentPassword" class="error" />
        </label>
        <label for="NewPassword" class="form-item">
          <span>Новый пароль</span>
          <Field
            name="NewPassword"
            id="NewPassword"
            class="input"
            type="password"
          />
          <ErrorMessage name="NewPassword" class="error" />
        </label>
        <DefaultButton>Обновить пароль</DefaultButton>
      </useForm>
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { useInfo, usePassword } from "~/composables/useSchema";
import { useUser } from "~/store/user";

let userState = useUser();

let onSubmit = (data) => {
  if (data) {
    userState.updateProfile(data);
  }
};
let onUpdatePassword = (data) => {
  if (data) {
    Confirm(
      "Смена пароля",
      "Вы уверенны что хотите сменить пароль? После смены пароля потребуется поторная авторизация."
    ).then((result) => {
      if (result.isConfirmed) {
        userState.updateProfile(data);
      }
    });
  }
};
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped lang="less">
.setting {
  display: flex;
  justify-content: space-between;
  @media @md {
    flex-direction: column;
  }
  &-item {
    width: 48%;
    padding: 10px 15px;
    .br(10px);
    background: #fff;
    @media @md {
      width: 100%;
    }
    h5 {
      font-size: 2em;
      margin-bottom: 10px;
    }
    .form {
      margin: 0;
    }
  }
  &-item:last-child {
    @media @md {
      margin-top: 2em;
    }
  }
}
</style>
