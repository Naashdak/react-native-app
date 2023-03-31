import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { UserSkill } from "../../core/domain/model/UserSkill";
import { UserWithSkillsDTO } from "../../core/domain/model/UserWithSkillsDTO";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Details'>

function DetailsScreen({route, navigation}: Props) {
  const user: UserWithSkillsDTO = route.params.user;
  const userSkill: UserSkill = route.params.userSkill;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
      <Text>itemId: {user.id.toString()}</Text>
      <Text>username: {user.username}</Text>
      <Text>email: {user.email}</Text>
      <Text>note : {userSkill.personnalNote}</Text>
    </View>
  );
}

export default DetailsScreen;