import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Course } from "../domain/model/Course";
import { User } from "../domain/model/User";

export type StackNavigatorParamList = {
  Home: undefined;
  Login: undefined;
  Details: {user: User};
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