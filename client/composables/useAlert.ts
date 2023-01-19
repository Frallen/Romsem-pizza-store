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

export const Confirm = (title: String, text: String) => {
  return useNuxtApp().$swal.fire({
    title: "Смена пароля",
    text: "Вы уверенны что хотите сменить пароль? После смены пароля потребуется поторная авторизация.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#fe5000",
    cancelButtonColor: "#a4acad",
    confirmButtonText: "Подтвердить",
    cancelButtonText: "Отменить",
  });
};

export const AddedToBasket = () => {
  return useNuxtApp().$swal.fire({
    toast: true, icon: "success",
    title: "Товар успешно добавлен корзину!",
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: any) => {
      toast.addEventListener("mouseenter", useNuxtApp().$swal.stopTimer);
      toast.addEventListener("mouseleave", useNuxtApp().$swal.resumeTimer);
    },
  });

};

