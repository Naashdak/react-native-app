export interface ICityService {
    // getCityByName(cityName: string): Promise<Response>
    getNearbyCitiesWithinRadius(radius: number, latitude: number, longitude: number): Promise<string[]>
}