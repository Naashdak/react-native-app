import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../../di/inversify.identifiers";
import { IGeolocationApiService } from "../interfaces/IGeolocationApiService";
import { IGeolocationService } from "../interfaces/IGeolocationService";

@injectable()
export class GeolocationService implements IGeolocationService{
    constructor(@inject(SERVICE_IDENTIFIER.GEOLOCATIONAPISERVICE) private geolocationApiService: IGeolocationApiService){}
    getCityByCoordinates(lat: number, lon: number): Promise<string> {
        return this.geolocationApiService.getCityByCoordinates(lat, lon)
    }
}