import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../../di/inversify.identifiers";
import { IApiService } from "../interfaces/IApiService";
import { Category } from "../model/Category";
import { ICategoryService } from "../../../courses_feature/domain/ICategoryService";
import { CategoriesWithSkillDTO } from "../model/CategoriesWithSkillsDTO";

@injectable()
export class CategoryService implements ICategoryService{
    public constructor(@inject(SERVICE_IDENTIFIER.APISERVICE) private apiService: IApiService){}
    

    public async getCategories(): Promise<Category[]>{
        try {
            return this.apiService.getCategories()
        } catch (error: any) {
            return error.message;
        }
    }

    public getCategoriesWithSkills(): Promise<CategoriesWithSkillDTO[]> {
        try {
            return this.apiService.getCategoriesWithSkills()
        } catch (error: any) {
            return error.message;
        }
    }
}