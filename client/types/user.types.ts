import { catalogItemAttributes } from "~/types/catalog.types";

export interface UserType {
  FI: string;
  Favorites: catalogItemAttributes[];
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id?: number;
  provider: string;
  reviews: reviewsType[];
  role?: object;
  updatedAt: string;
  username: string;
}

export interface reviewsType {
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  Text: string;
  Title: string;
  id?: number;
}

export interface UserState {
  user: UserType;
  isLoading: boolean;
}
export interface updateInfoType {
  userName?: string;
  email?: string;
  CurrentPassword?: string;
  NewPassword?: string;
}
export interface AuthType {
  userName?: string;
  email: string;
  password: string;
}
