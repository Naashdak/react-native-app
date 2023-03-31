import { Course } from "../../domain/model/Course"
import { User } from "../../domain/model/User"

// TODO
export interface IApiService{
    getCourses(): Course[]
    getCourseById(id: Number): Course
    getCoursesByTitle(title: String): Course[]

    getUsers(): Promise<User[]>
}