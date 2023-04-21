import { injectable } from "inversify";
import { IGeolocationApiService } from "../../domain/IGeolocationApiService";
import { City } from "../../domain/model/City";

@injectable()
export class GeolocationApiService implements IGeolocationApiService {
    public async getCityByCoordinates(lat: number, lon:number): Promise<City> {
        try {
            const response = await fetch(
                `https://geo.api.gouv.fr/communes?lat=${lat}&lon=${lon}&fields=nom,codesPostaux,centre`,
                {
                    method: 'GET',
                }
            );
            if(!response.ok){
                throw new Error("Erreur")
            }

            const json: any = response.json()
            return {
                id: json.data,
                cityName: "",
                zipCode: "",
                latitude: 0,
                longitude: 0
            }
            
        } catch (error: any) {
            return error.message;
        }
    }
}