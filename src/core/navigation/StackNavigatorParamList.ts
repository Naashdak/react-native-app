import { UserSkillsWithUserAndCityDTO } from "../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";

export type StackNavigatorParamList = {
  Login: undefined;
  Details: {course: UserSkillsWithUserAndCityDTO};
  Account: {userName: string};
  Courses: undefined;
};