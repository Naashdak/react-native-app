import { UserSkillsWithUserAndCityDTO } from "../../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO"
import { CategoriesWithSkillDTO } from "../model/CategoriesWithSkillsDTO"
import { Category } from "../model/Category"
import { City } from "../model/City"
import { Skill } from "../model/Skill"

export interface IApiService {
    getNearbyCitiesWithinRadius(radius: number, latitude: number, longitude: number): Promise<City[]>
    getCourses(nearbyCities: string[]): Promise<UserSkillsWithUserAndCityDTO[]>
    getCategories(): Promise<Category[]>
    getAllSkills(): Promise<Skill[]>
    getSkillsByCategories(categoryIds: number[]): Promise<Skill[]>
    getCategoriesWithSkills(): Promise<CategoriesWithSkillDTO[]>
}