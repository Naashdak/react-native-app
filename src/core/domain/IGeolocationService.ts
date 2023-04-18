
export interface IGeolocationService {
    getCityByCoordinates(lat: number, lon: number): Promise<Response>
    getNearbyCities(lat: number, lon: number): Promise<Response>
}