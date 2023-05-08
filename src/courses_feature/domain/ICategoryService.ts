import { CategoriesWithSkillDTO } from "../../core/domain/model/CategoriesWithSkillsDTO";
import { Category } from "../../core/domain/model/Category";

export interface ICategoryService {
    getCategories(): Promise<Category[]>
    getCategoriesWithSkills(): Promise<CategoriesWithSkillDTO[]>
}