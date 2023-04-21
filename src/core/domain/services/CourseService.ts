import { inject, injectable } from "inversify";
import { ICourseService } from "../../../courses_feature/domain/ICourseService";
import SERVICE_IDENTIFIER from "../../di/inversify.identifiers";
import { IApiService } from "../interfaces/IApiService";
import { UserSkillsWithUserAndCityDTO } from "../../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";

@injectable()
export class CourseService implements ICourseService{
    public constructor(@inject(SERVICE_IDENTIFIER.APISERVICE) private apiService: IApiService){}
    


    public async getCourses(nearbyCities: string[]): Promise<UserSkillsWithUserAndCityDTO[]>{
        try {
            return this.apiService.getCourses(nearbyCities)
        } catch (error: any) {
            return error.message;
        }
    }
}