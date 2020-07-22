import { ICoordinates } from '../places/place';

export interface IMap {
  className?: string;
  style?: any;
  center: ICoordinates;
  zoom: number;
}
