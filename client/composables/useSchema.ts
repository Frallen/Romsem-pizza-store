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

export const useSchemaUpdate = () => {
  return yup.object({
    userName: yup.string(),
    email: yup.string().email(() => email()),
    password: yup.string().min(8, () => min8()),
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
