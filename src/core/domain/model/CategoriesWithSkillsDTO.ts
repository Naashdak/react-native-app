import { Skill } from "./Skill";

export interface CategoriesWithSkillDTO {
    id: number,
    categoryName: string,
    skills: Skill[]
}