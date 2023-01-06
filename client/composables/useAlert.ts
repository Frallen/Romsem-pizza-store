export const Success = (title: String, text: String) => {
  return useNuxtApp().$swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonText: "Хорошо",
  });
};
export const Error = (text: String) => {
  return useNuxtApp().$swal.fire({
    title: "Ошибка",
    text: text, // "Повторите попытку позже",
    icon: "error",
    confirmButtonText: "Хорошо",
  });
};
