export interface IGeolocationApiService {
    getCityByCoordinates(lat: number, lon: number): Promise<string>
}