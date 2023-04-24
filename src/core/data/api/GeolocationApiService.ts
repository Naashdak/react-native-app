import { injectable } from "inversify";
import { IGeolocationApiService } from "../../domain/interfaces/IGeolocationApiService";

@injectable()
export class GeolocationApiService implements IGeolocationApiService {
    public async getCityByCoordinates(lat: number, lon:number): Promise<string> {
        try {
            console.log(lat, lon)
            const response = await fetch(
                `https://geo.api.gouv.fr/communes?lat=49.3821843&lon=1.0745217&fields=nom,codesPostaux,centre`,
                {
                    method: 'GET',
                }
            );
            console.log(response)
            if(!response.ok){
                throw new Error("Erreur")
            }

            // TODO : todo
            const json = await response.json() as any
            console.log("api gouv city : ", json)
            return json.nom
            
        } catch (error: any) {
            return error.message;
        }
    }
}