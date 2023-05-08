import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../../di/inversify.identifiers";
import { IApiService } from "../interfaces/IApiService";
import { ISkillService } from "../../../courses_feature/domain/ISkillService";
import { Skill } from "../model/Skill";

@injectable()
export class SkillService implements ISkillService{
    public constructor(@inject(SERVICE_IDENTIFIER.APISERVICE) private apiService: IApiService){}

    public async getSkills(): Promise<Skill[]>{
        try {
            return this.apiService.getAllSkills()
        } catch (error: any) {
            return error.message;
        }
    }

    public async getSkillsByCategories(categoryIds: number[]): Promise<Skill[]> {
        try {
            return this.apiService.getSkillsByCategories(categoryIds)
        } catch (error: any) {
            return error.message;
        }
    }
}