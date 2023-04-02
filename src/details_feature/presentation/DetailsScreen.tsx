import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { UserSkill } from "../../core/domain/model/UserSkill";
import { UserWithSkillsDTO } from "../../core/domain/model/UserWithSkillsDTO";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { UserSkillsWithUserAndCityDTO } from "../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Details'>

function DetailsScreen({route, navigation}: Props) {
  const course: UserSkillsWithUserAndCityDTO = route.params.course;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
      <Text>itemId: {course.user.id.toString()}</Text>
      <Text>username: {course.user.username}</Text>
      <Text>email: {course.user.email}</Text>
      <Text>note : {course.personnalNote}</Text>
    </View>
  );
}

export default DetailsScreen;