import { City } from "../model/City";

export interface IGeolocationService {
    getCityByCoordinates(lat: number, lon:number): City
}