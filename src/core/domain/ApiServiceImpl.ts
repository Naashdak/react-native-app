import { IApiService } from "../data/api/IApiService";
import { Course } from "./model/Course";
import { data } from "../utils/DummyData"
import { User } from "./model/User";

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

    async getUsers(): Promise<User[]> {
        try {
            const response = await fetch("http://localhost:1337/api/users?populate[0]=userSkills");
            if(!response.ok)
                throw new Error(response.statusText);
            const json = await response.json();
            const data = json as {
                results: User[]
            }
            return data.results
            
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}