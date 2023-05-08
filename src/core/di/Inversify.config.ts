import "reflect-metadata"

import { Container } from "inversify"

import SERVICE_IDENTIFIER from "./inversify.identifiers";
import { createContext } from "react";
import { ICourseService } from "../../courses_feature/domain/ICourseService";
import { CityService } from "../domain/services/CityService";
import { CourseService } from "../domain/services/CourseService";
import { IApiService } from "../domain/interfaces/IApiService";
import { StrapiApiService } from "../data/api/StrapiApiService";
import { GeolocationApiService } from "../data/api/GeolocationApiService";
import { GeolocationService } from "../domain/services/GeolocationService";
import { ICityService } from "../domain/interfaces/ICityService";
import { IGeolocationApiService } from "../domain/interfaces/IGeolocationApiService";
import { IGeolocationService } from "../domain/interfaces/IGeolocationService";
import { ISkillService } from "../../courses_feature/domain/ISkillService";
import { SkillService } from "../domain/services/SkillService";
import { ICategoryService } from "../../courses_feature/domain/ICategoryService";
import { CategoryService } from "../domain/services/CategoryService";

let container = new Container();

container.bind<IApiService>(SERVICE_IDENTIFIER.APISERVICE).to(StrapiApiService).inSingletonScope()
container.bind<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE).to(CourseService).inSingletonScope()
container.bind<IGeolocationApiService>(SERVICE_IDENTIFIER.GEOLOCATIONAPISERVICE).to(GeolocationApiService)
container.bind<IGeolocationService>(SERVICE_IDENTIFIER.GEOLOCATIONSERVICE).to(GeolocationService)
container.bind<ICityService>(SERVICE_IDENTIFIER.CITYSERVICE).to(CityService)
container.bind<ISkillService>(SERVICE_IDENTIFIER.SKILLSERVICE).to(SkillService)
container.bind<ICategoryService>(SERVICE_IDENTIFIER.CATEGORYSERVICE).to(CategoryService)

const ContainerContext = createContext(container);
export {container, ContainerContext};