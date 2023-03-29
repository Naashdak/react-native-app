import { Course } from "../../domain/model/Course"

export interface IApiService{
    getCourses(): Course[]
    getCourseById(id: Number): Course
    getCoursesByTitle(title: String): Course[]
}