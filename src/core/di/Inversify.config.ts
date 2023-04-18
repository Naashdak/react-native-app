import "reflect-metadata"

import { Container } from "inversify"

import SERVICE_IDENTIFIER from "./inversify.identifiers";
import { createContext } from "react";
import { CourseService } from "../data/api/CoursesService";
import { ICourseService } from "../../courses_feature/domain/ICourseService";

let containter = new Container();

containter.bind<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE).to(CourseService)

export const ContainerContext = createContext(containter);
export default containter;