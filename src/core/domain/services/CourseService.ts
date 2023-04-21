import { inject, injectable } from "inversify";
import { ICourseService } from "../../../courses_feature/domain/ICourseService";
import SERVICE_IDENTIFIER from "../../di/inversify.identifiers";
import { IApiService } from "../IApiService";
import { UserSkillsWithUserAndCityDTO } from "../../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";
import { container } from "../../di/Inversify.config";
import { IGeolocationApiService } from "../IGeolocationApiService";

@injectable()
export class CourseService implements ICourseService{
    public constructor(@inject(SERVICE_IDENTIFIER.APISERVICE) private apiService: IApiService){}
    // private apiService: IApiService = container.get<IApiService>(SERVICE_IDENTIFIER.APISERVICE);
    


    public async getCourses(nearbyCities: string[]): Promise<UserSkillsWithUserAndCityDTO[]>{
        try {
            return this.apiService.getCourses(nearbyCities)
        } catch (error: any) {
            return error.message;
        }
    }
}