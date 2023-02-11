import { reviewsType, UserType } from "~/types/user.types";

interface ingridients {
  attributes: {
    Active: null;
    Ingridient: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
  id: number;
}
export interface catalogItemType {
  id: number;
  attributes: catalogItemAttributes;
}
export interface catalogItemAttributes {
  Active: boolean;
  Description?: string;
  DetailImage?: Object;
  Gramm?: string;
  Image?: Object;
  Price: number;
  Text?: string;
  Title: string;
  ingridients?: ingridients;
  createdAt: string;
  itemID: string;
  main_slider?: Object;
  product_sizes?: Object;
  publishedAt: string;
  stock?: number;
  type: string;
  updatedAt: string;
  //для UserType.Favorites.id
  id?: number;
}

export interface ordersType {
  attributes: {
    OrderItems: string;
    Owner: string;
    PhoneNumber: string;
    Status: string;
    Sum: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
  id: number;
}
export interface reviewsTypeByItem extends reviewsType {
  attributes: {
    Owner: {
      data: {
        attributes: UserType;
        id: 12;
      };
    };
    catalog_item: {
      data: catalogItemAttributes;
    };
  };
  id: number;
}
export interface CatalogState {
  catalogItems: catalogItemType[];
  orders: ordersType[];
  isLoading: boolean;
  reviews: reviewsTypeByItem[];
}

export interface addToBasketType {
  id: number;
  value: string[];
}
export interface newReview {
  title: string;
  text: string;
}
export interface SessionOrderType {
  id: number;
  type: string;
  sum: number;
}
