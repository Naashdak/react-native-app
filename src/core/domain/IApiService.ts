import { UserSkillsWithUserAndCityDTO } from "../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO"
import { City } from "./model/City"

export interface IApiService {
    getNearbyCitiesWithinRadius(radius: number, latitude: number, longitude: number): Promise<City[]>
    getCourses(nearbyCities: string[]): Promise<UserSkillsWithUserAndCityDTO[]>
}