import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserSkill } from "../domain/model/UserSkill";
import { UserWithSkillsDTO } from "../domain/model/UserWithSkillsDTO";

export type StackNavigatorParamList = {
  Home: undefined;
  Login: undefined;
  Details: {user: UserWithSkillsDTO, userSkill: UserSkill};
  Account: {userName: string};
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  'Details'
>;

export type DetailsScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  'Details'
>;