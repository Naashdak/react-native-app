import { injectable } from "inversify";
import { IApiService } from "../../domain/interfaces/IApiService";
import { City } from "../../domain/model/City";
import { UserSkillsWithUserAndCityDTO } from "../../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";
// @ts-ignore
import {API_BASE, BEARER_TOKEN} from "react-native-dotenv"
import { Skill } from "../../domain/model/Skill";
import { Category } from "../../domain/model/Category";
import { CategoriesWithSkillDTO } from "../../domain/model/CategoriesWithSkillsDTO";


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
    public async getCategories(): Promise<Category[]>{
        try {
            const response = await fetch(
                `${API_BASE}categories?fields[0]=categoryName`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${BEARER_TOKEN}`, 
                    'Content-Type': 'application/json'
                }), 
            });
            if(!response.ok){
                throw new Error("Erreur")
            }
            const json = await response.json() as { data: Category[] }
            return json.data
        } catch (error: any) {
            throw new Error(error?.message || "Erreur")
        }
    }

    public async getCategoriesWithSkills(): Promise<CategoriesWithSkillDTO[]>{
        
        try {
            const response = await fetch(
                `${API_BASE}categories?fields[0]=categoryName&populate[skills][fields][0]=skillName`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${BEARER_TOKEN}`, 
                    'Content-Type': 'application/json'
                }), 
            });
            if(!response.ok){
                throw new Error("Erreur")
            }
            const json = await response.json() as { data: CategoriesWithSkillDTO[] }
            return json.data
        } catch (error: any) {
            throw new Error(error?.message || "Erreur")
        }
    }

    public async getAllSkills(): Promise<Skill[]> {
        try {
            const response = await fetch(
                `${API_BASE}skills?fields[0]=skillName`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${BEARER_TOKEN}`, 
                    'Content-Type': 'application/json'
                }), 
            });
            if(!response.ok){
                throw new Error("Erreur")
            }
            const json = await response.json() as { data: Skill[] }
            return json.data
        } catch (error: any) {
            throw new Error(error?.message || "Erreur")
        }
    }

    public async getSkillsByCategories(categoryIds: number[]): Promise<Skill[]> {
        try {
            let idFilter: string = ""
            if(categoryIds.length > 0){
                for(let i = 0; i < categoryIds.length; i++){
                    idFilter += `&filters[category][id][$eq]=${categoryIds[i]}`
                }
            }
            const response = await fetch(
                `${API_BASE}skills?fields[0]=skillName${idFilter}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${BEARER_TOKEN}`, 
                    'Content-Type': 'application/json'
                }), 
            });
            if(!response.ok){
                throw new Error("Erreur")
            }
            const json = await response.json() as { data: Skill[] }
            return json.data
        } catch (error: any) {
            throw new Error(error?.message || "Erreur")
        }
    }

    
}