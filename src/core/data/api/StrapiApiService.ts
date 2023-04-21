import { injectable } from "inversify";
import { IApiService } from "../../domain/IApiService";
import { City } from "../../domain/model/City";
import { UserSkillsWithUserAndCityDTO } from "../../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";

@injectable()
export class StrapiApiService implements IApiService{
    public async getNearbyCitiesWithinRadius(radius: number, latitude: number, longitude: number): Promise<City[]> {
        try {
            const response = await fetch(
                `https://knowedgestrapi.azurewebsites.net/api/villes?fields=cityName&fields=zipCode&fields=latitude&fields=longitude`,
                {
                    method: 'GET'
                }
            )
            if(!response.ok){
                throw new Error("Erreur")
            }
            const json = await response.json() as { data: City[] }
            return json.data

        } catch (error: any) {
            throw new Error(error?.message || "Erreur")
        }
    }

    public async getCourses(nearbyCities: string[]): Promise<UserSkillsWithUserAndCityDTO[]> {
        try {
            let cityFilter: string = ""
            if(nearbyCities.length > 0){
                for(let i = 0; i < nearbyCities.length; i++){
                    cityFilter += `&filters[user][city][cityName][$eq]=${nearbyCities[i]}`
                }
            }

            const response = await fetch(
                `https://knowedgestrapi.azurewebsites.net/api/user-skills?fields[0]=personnalNote&fields[0]=skillLevel&populate[skill][fields][0]=skillName&populate[user][fields][0]=username&populate[user][fields][0]=email&populate[user][populate][city][fields][0]=cityName&populate[user][populate][city][fields][0]=zipCode${cityFilter}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer 2407469d8f130469dbb41a9ccf03a1aefc912f23ee6d148f46766762c1a6739507ec0f3ae1e537a20f2002f5219c9a95193786ba6b30f952b1fe506a7e9f38554e9c77104736486e54dfb278e1eb7be3043d1afb226523b365306fd79db48825ae24dff3f65a55a607dc1a27af5cfdece9db44ab6a9915d887e516ebb9f5153e', 
                    'Content-Type': 'application/json'
                }), 
            });
            if(!response.ok){
                throw new Error("Erreur")
            }
            const json = await response.json() as { data: UserSkillsWithUserAndCityDTO[] }
            return json.data
        } catch (error: any) {
            throw new Error(error?.message || "Erreur")
        }
    }
}