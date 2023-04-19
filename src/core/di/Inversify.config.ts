import "reflect-metadata"

import { Container } from "inversify"

import SERVICE_IDENTIFIER from "./inversify.identifiers";
import { createContext } from "react";
import { CourseService } from "../data/api/CoursesService";
import { ICourseService } from "../../courses_feature/domain/ICourseService";
import { IGeolocationService } from "../domain/IGeolocationService";
import { GeolocationService } from "../data/api/GeolocationService";

let container = new Container();

container.bind<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE).to(CourseService)
container.bind<IGeolocationService>(SERVICE_IDENTIFIER.GEOLOCATIONSERVICE).to(GeolocationService)

const ContainerContext = createContext(container);
export {container, ContainerContext};