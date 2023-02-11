<template>
  <div class="basket">
    <template v-if="basketItems.length > 0">
      <div class="basket-wrapper shadow">
        <div class="basket-item" v-for="item in basketItems" :key="item.id">
          <transition-group name="fade">
            <div
              v-for="(i, index) in item.value"
              :key="item.id"
              class="basket-item-type"
            >
              <BasketItem
                :item="item"
                :type="i"
                @remove="Remove"
                @sum="calculateOverallTotalSum"
              ></BasketItem>
            </div>
          </transition-group>
        </div>
      </div>
      <div class="basket-total shadow">
        <div class="basket-total-price">
          <span>Итого</span> <span>{{ summary }} р</span>
        </div>
        <div class="basket-total-form">
          <UseForm :Schema="usePhone()" class="form" @data="onSubmit">
            <Field
              name="phone"
              id="phone"
              class="input"
              type="text"
              placeholder="Номер телефона"
            ></Field>
            <ErrorMessage name="phone" class="error" />
            <DefaultButton>Заказать</DefaultButton></UseForm
          >
        </div>
        <SecondButton
          class="basket-total-clear"
          @click.stop="clearBasketQuestion()"
          >Очистить корзину</SecondButton
        >
      </div>
    </template>
    <div v-else class="basket-empty">
      <Icon name="quill:folder-trash" :size="'10em'" />
      <h3>В корзине пусто</h3>
      <NuxtLink to="/" class="button">На главную</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePhone } from "~/composables/useSchema";
import { Field, ErrorMessage } from "vee-validate";
import { useCatalog } from "~/store/catalog";
import { useSessionStorage } from "@vueuse/core";
import {addToBasketType, catalogItemType, SessionOrderType} from "~/types/catalog.types";
const catalog = useCatalog();
const config = useRuntimeConfig();
let summary = useState<number>("summary");
let sessionOrder = useSessionStorage("basket", [] as SessionOrderType[]);

let Remove = async (id: number, type: string) => {
  await catalog.removeItem(id, type).then(async () => {
    basketItems.value = await fillteredItems(false);
  });
};
interface FormValueType {
  phone: string;
}
let onSubmit = async (data: FormValueType) => {
  await catalog
    .addOrder(sessionOrder.value, summary.value, data.phone)
    .then(() => (basketItems.value = fillteredItems(true)));
};

let basketItems = ref<catalogItemType[]>();
let clearBasketQuestion = () => {
  Confirm("Очистить заказ", "Вы уверены что хотите очистить корзину?").then(
    async (result: any) => {
      if (result.isConfirmed) {
        basketItems.value = await fillteredItems(true);
      }
    }
  );
};
// Извлечение заказов для корзины из cookies
let fillteredItems = (val: boolean) => {
  let cookie = useCookie("order");

  if (val) {
    cookie.value = null;
    sessionOrder.value = [];
  }
  let order = [...(cookie.value ?? "")]as addToBasketType[];
  if (order) {
    let arr = catalog.catalogItems.filter(
      (p) => order.find((z) => z.id === p.id) && p
    );
    order.map((z) =>
      arr.map((p) => {
        if (z.id === p.id && z.value) {
          p.value = [...z.value];
        }
      })
    );

    return arr;
  } else {
    return [];
  }
};

basketItems.value = fillteredItems(false);

const calculateOverallTotalSum = (id: number, type: string, sum: number) => {
  if (sessionOrder.value.some((p) => p.id === id && p.type.includes(type))) {
    sessionOrder.value.map((p) => {
      if (p.id === id && p.type === type) {
        return (p.sum = sum);
      }
    });
  } else {
    let obj = {
      id: id,
      type: type,
      sum: sum,
    };
    sessionOrder.value.push(obj);
  }

  summary.value = sessionOrder.value.reduce(
    (total, item) => item.sum + total,
    0
  );
};
</script>

<style scoped lang="less">
.basket {
  margin: 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  @media @lg {
    display: block;
    margin: 1em 0 13em;
  }
  &-wrapper {
    display: flex;
    flex-direction: column;
    width: 65%;
    @media @lg {
      width: 100%;
    }
  }
  &-item {
    margin-top: 1em;
    &-type {
      margin-top: 1em;
    }
    &-type:first-child {
      margin-top: 0;
    }
  }
  &-item:first-child {
    margin-top: 0;
  }

  &-total {
    position: sticky;
    top: 8%;
    height: fit-content;
    background: #fff;
    width: 30%;
    padding: 15px;
    .br(10px);
    @media @lg {
      position: fixed;
      top: inherit;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    @media @md {
      padding: 10px 15px;
    }
    &-price {
      color: @black;
      font-size: 1.5em;
      font-weight: 700;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media @lg {
        font-size: 2em;
      }
    }
    &-form {
      display: flex;
      flex-direction: column;
      @media @lg {
        justify-content: space-between;

        flex-direction: column;
        align-items: inherit;
      }
      .button {
        margin-top: 15px;
        width: auto;
      }
    }
    &-clear {
      background: #f1f4f9;
    }
  }
  &-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    top: 35%;
    left: 0;
    right: 0;
    h3 {
      margin: 10px 0 1em;
      font-size: 2em;
    }
    svg {
    }
    .button {
      background: #f1f4f9;
      color: @black;
      width: fit-content;
    }
  }
}
.form {
  @media @xs {
    margin: 10px 0;
  }
}
</style>
