export interface IndexState {
  isLoading: boolean;
  Phones: PhoneType[];
  MainSliderData: MainSliderType[];
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
