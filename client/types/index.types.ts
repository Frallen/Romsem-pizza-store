export interface IndexState {
  isLoading: boolean;
  Phones: PhoneType[];
  MainSliderData: MainSliderType[];
  Articles: ArticlesType[];
}
export interface ArticlesType {
  id: number;

  attributes: {
    Image: { data: {} };
    Title: string;
    Text: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface PhoneType {
  attributes: {
    MainNumber: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
  id: number;
}
export interface MainSliderType {
  id: number;
  attributes: {
    Image: { data: {} };
    Mobileimage?: { data: {} };
    Title?: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
}
