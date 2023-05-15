import { injectable } from "inversify";
import { IGeolocationApiService } from "../../domain/interfaces/IGeolocationApiService";
import { GeolocationApiProperties } from "../../domain/model/GeolocationApiProperties";

@injectable()
export class GeolocationApiService implements IGeolocationApiService {
    public async getCityByCoordinates(lat: number, lon:number): Promise<string> {
        try {
            const response = await fetch(
                `https://geo.api.gouv.fr/communes?lat=49.3821843&lon=1.0745217&fields=nom,codesPostaux,centre`,
                {
                    method: 'GET',
                }
            );
            if(!response.ok){
                throw new Error(await response.text())
            }

            const json = await response.json() as GeolocationApiProperties[]
            return json[0].nom
            
        } catch (error: any) {
            return error.message;
        }
    }
}