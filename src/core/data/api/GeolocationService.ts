import { injectable } from "inversify";
import "reflect-metadata";
import { IGeolocationService } from "../../domain/IGeolocationService";

const API_KEY = "c3d2428e183cdf12dfd41dd6fa43638a"

@injectable()
export class GeolocationService implements IGeolocationService {
    public async getCityByCoordinates(lat: number, lon:number): Promise<Response> {
        try {
            return await fetch(
                `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`, 
                {
                    method: 'GET',
                }
            );
        } catch (error: any) {
            return error.message;
        }
    }

    public async getNearbyCities(lat: number, lon: number): Promise<Response> {
        try {
            return await fetch(
                `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&units=metric&appid=${API_KEY}`,
                {
                    method: 'GET',
                }
            );
        } catch (error: any) {
            return error.message;
        }
    }

}