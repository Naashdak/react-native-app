import { injectable } from "inversify";
import { IApiService } from "../../domain/interfaces/IApiService";
import { City } from "../../domain/model/City";
import { UserSkillsWithUserAndCityDTO } from "../../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";
// @ts-ignore
import {API_BASE, BEARER_TOKEN} from "react-native-dotenv"


@injectable()
export class StrapiApiService implements IApiService{
    public async getNearbyCitiesWithinRadius(radius: number, latitude: number, longitude: number): Promise<City[]> {
        try {
            const response = await fetch(
                `${API_BASE}villes?fields=cityName&fields=zipCode&fields=latitude&fields=longitude`,{
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${BEARER_TOKEN}`, 
                    'Content-Type': 'application/json'
                }), 
            })
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
                `${API_BASE}user-skills?fields[0]=personnalNote&fields[0]=skillLevel&populate[skill][fields][0]=skillName&populate[user][fields][0]=username&populate[user][fields][0]=email&populate[user][populate][city][fields][0]=cityName&populate[user][populate][city][fields][0]=zipCode${cityFilter}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${BEARER_TOKEN}`, 
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