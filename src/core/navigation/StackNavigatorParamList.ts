import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Course } from "../domain/model/Course";

export type StackNavigatorParamList = {
    Home: undefined;
    Details: {
      course: Course;
    };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  'Details'
>;

export type DetailsScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  'Details'
>;