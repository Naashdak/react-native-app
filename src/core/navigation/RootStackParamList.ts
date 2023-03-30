import { Course } from "../domain/model/Course";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Details: {course: Course};
    Account: {userName: string};
}