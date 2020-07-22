export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IPlaceItem {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  coordinates: ICoordinates;
  onDelete: (deletedPlaceId: string) => void;
}

export interface IPlaceList {
  items: IPlaceItem[];
  onDelete: (deletedPlaceId: string) => void;
}
