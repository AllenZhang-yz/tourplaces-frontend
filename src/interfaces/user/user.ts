export interface IUserItem {
  id: string;
  name: string;
  image: string;
  places: [];
}

export interface IUsersList {
  items: IUserItem[];
}
