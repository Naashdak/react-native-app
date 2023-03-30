import { IApiService } from "../data/api/IApiService";
import { Course } from "./model/Course";
import { data } from "../utils/DummyData"

// TODO
export class ApiServiceImpl implements IApiService {
    
    getCourses(): Course[] {
        return data
    }
    getCourseById(id: Number): Course {
        let course: Course = data.find(c => c.id === id) as Course
        return course
    }

    getCoursesByTitle(title: String): Course[] {
        let courses: Course[] = data.filter(c => c.title === title)
        return courses
    }
}