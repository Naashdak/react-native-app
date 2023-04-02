import { UserSkillsWithUserAndCityDTO } from "./model/UserSkillsWithUserAndCityDTO";

export interface ICourseService {
    getCourses(): Promise<UserSkillsWithUserAndCityDTO[]>
}