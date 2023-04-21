import { City } from "./model/City";

export interface IGeolocationApiService {
    getCityByCoordinates(lat: number, lon: number): Promise<City>
}