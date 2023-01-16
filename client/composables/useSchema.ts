import * as yup from "yup";
export const useSchemaReg = () => {
  return yup.object({
    userName: yup.string().required(() => required()),
    email: yup
      .string()
      .email(() => email())
      .required(() => required()),
    password: yup
      .string()
      .min(8, () => min8())
      .required(),
  });
};

export const useInfo = () => {
  return yup.object({
    userName: yup.string(),
    email: yup.string().email(() => email()),
  });
};
export const usePassword = () => {
  return yup.object({
    CurrentPassword: yup.string().min(8, () => min8()).required(() => required()),
    NewPassword: yup.string().min(8, () => min8()).required(() => required()),
  });
};
export const useSchemaAuth = () => {
  return yup.object({
    email: yup
      .string()
      .email(() => email())
      .required(() => required()),
    password: yup
      .string()
      .min(8, () => min8())
      .required(() => required()),
  });
};
let min8 = () => "Минимальная длина пароля 8 символов";
let required = () => "Это обязательное поле";
let email = () => "Не является почтой";
