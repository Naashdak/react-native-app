import { UserSkillsWithUserAndCityDTO } from "./model/UserSkillsWithUserAndCityDTO";

export interface ICourseService {
    getCourses(nearbyCities: string[]): Promise<UserSkillsWithUserAndCityDTO[]>
}