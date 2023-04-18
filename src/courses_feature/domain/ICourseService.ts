export interface ICourseService {
    getCourses(nearbyCities: string[]): Promise<Response>
}