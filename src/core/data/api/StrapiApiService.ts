import { injectable } from "inversify";
import { IApiService } from "../../domain/interfaces/IApiService";
import { City } from "../../domain/model/City";
import { UserSkillsWithUserAndCityDTO } from "../../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";
import { Skill } from "../../domain/model/Skill";
import { Category } from "../../domain/model/Category";
import { CategoriesWithSkillDTO } from "../../domain/model/CategoriesWithSkillsDTO";

const API_BASE = process.env.API_BASE
const BEARER_TOKEN = process.env.BEARER_TOKEN

@injectable()
export class StrapiApiService implements IApiService{
    public async getNearbyCitiesWithinRadius(radius: number, latitude: number, longitude: number): Promise<City[]> {
        try {
            const response = await fetch(
                `${API_BASE}/api/villes?fields=cityName&fields=zipCode&fields=latitude&fields=longitude`,{
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
                `${API_BASE}/api/user-skills?fields[0]=personnalNote&fields[0]=skillLevel&populate[skill][fields][0]=skillName&populate[user][fields][0]=username&populate[user][fields][0]=email&populate[user][populate][picture][fields][0]=name&populate[user][populate][picture][fields][0]=alternativeText&populate[user][populate][picture][fields][0]=url&populate[user][populate][city][fields][0]=cityName&populate[user][populate][city][fields][0]=zipCode${cityFilter}`, {
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
                `${API_BASE}/api/categories?fields[0]=categoryName`, {
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
                `${API_BASE}/api/categories?fields[0]=categoryName&populate[skills][fields][0]=skillName`, {
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
                `${API_BASE}/api/skills?fields[0]=skillName`, {
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
                `${API_BASE}/api/skills?fields[0]=skillName${idFilter}`, {
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