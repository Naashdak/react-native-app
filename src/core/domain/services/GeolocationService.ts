import { inject, injectable } from "inversify";
import { IGeolocationService } from "../IGeolocationService";
import SERVICE_IDENTIFIER from "../../di/inversify.identifiers";
import { IGeolocationApiService } from "../IGeolocationApiService";
import { City } from "../model/City";

@injectable()
export class GeolocationService implements IGeolocationService{
    constructor(@inject(SERVICE_IDENTIFIER.GEOLOCATIONAPISERVICE) private geolocationApiService: IGeolocationApiService){}
    // private geolocationApiService: IGeolocationApiService = container.get<IGeolocationApiService>(SERVICE_IDENTIFIER.GEOLOCATIONAPISERVICE);
    getCityByCoordinates(lat: number, lon: number): City {
        throw new Error("Method not implemented.");
    }

}