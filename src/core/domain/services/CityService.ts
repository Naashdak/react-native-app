import { inject, injectable } from "inversify";
import { City } from "../model/City";
import getDistance from "../../utils/GeolocationUtils";
import SERVICE_IDENTIFIER from "../../di/inversify.identifiers";
import { IApiService } from "../interfaces/IApiService";
import { ICityService } from "../interfaces/ICityService";

@injectable()
export class CityService implements ICityService{
    constructor(@inject(SERVICE_IDENTIFIER.APISERVICE) private apiService: IApiService){}
    
    public async getNearbyCitiesWithinRadius(radius: number, lat: number, lon: number): Promise<string[]>{
        try {
            const cities = await this.apiService.getNearbyCitiesWithinRadius(radius, lat, lon)
            return cities.filter((city: City) => {
                const distance = getDistance(lat, lon, city.latitude, city.longitude);
                return distance <= radius!;
            }).map((city: City) => city.cityName)
            
        } catch (error: any) {
            return error?.message || "Erreur 500"
        }
    }

    
}