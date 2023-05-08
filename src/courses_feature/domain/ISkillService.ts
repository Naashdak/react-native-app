import { Skill } from "../../core/domain/model/Skill";

export interface ISkillService {
    getSkills(): Promise<Skill[]>
    getSkillsByCategories(categoryIds: number[]): Promise<Skill[]>
}