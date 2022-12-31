import * as yup from "yup";
export const useSchemaReg = () => {
  return yup.object({
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });
};

export const useSchemaAuth = () => {
  return yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });
};
