import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../../di/inversify.identifiers";
import { City } from "../model/City";
import { IGeolocationApiService } from "../interfaces/IGeolocationApiService";
import { IGeolocationService } from "../interfaces/IGeolocationService";

@injectable()
export class GeolocationService implements IGeolocationService{
    constructor(@inject(SERVICE_IDENTIFIER.GEOLOCATIONAPISERVICE) private geolocationApiService: IGeolocationApiService){}
    getCityByCoordinates(lat: number, lon: number): City {
        throw new Error("Method not implemented.");
    }

}