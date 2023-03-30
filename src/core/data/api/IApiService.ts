import { Course } from "../../domain/model/Course"

// TODO
export interface IApiService{
    getCourses(): Course[]
    getCourseById(id: Number): Course
    getCoursesByTitle(title: String): Course[]
}