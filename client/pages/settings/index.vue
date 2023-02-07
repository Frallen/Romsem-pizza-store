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
    <div class="setting-item shadow">
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

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { useInfo, usePassword } from "~/composables/useSchema";
import { useUser } from "~/store/user";
import { delEmptyParams } from "~/composables/objectHelper";
import { updateInfoType } from "~/types/user.types";
let userState = useUser();

type mainType = {
  userName?: string | undefined;
  email?: string | undefined;
};
type passwordType = {
  CurrentPassword: string;
  NewPassword: string;
};
let onSubmit = (data: mainType): void => {
  Object.keys(data).forEach((key) => {
    if (keyIsInObject(key, data)) {
      if (data[key] === undefined) {
        delete data[key];
      }
    }
  });
  userState.updateProfile(data);
};
/// ДЛЯ РАБОТЫ TYPESCRIPT c object
function keyIsInObject<T extends object>(
  key: string | number | symbol,
  obj: T
): key is keyof T {
  return key in obj;
}
let onUpdatePassword = (data: passwordType): void => {
  if (data) {
    Confirm(
      "Смена пароля",
      "Вы уверенны что хотите сменить пароль? После смены пароля потребуется поторная авторизация."
    ).then((result: any) => {
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
