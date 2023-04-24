export interface IGeolocationService {
    getCityByCoordinates(lat: number, lon:number): Promise<string>
}