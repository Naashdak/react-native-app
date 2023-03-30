import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { Course } from "../../core/domain/model/Course";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Details'>

function DetailsScreen({route, navigation}: Props) {
  const course: Course = route.params.course;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
      <Text>itemId: {course.id.toString()}</Text>
      <Text>title: {course.title}</Text>
      <Text>description: {course.description}</Text>
    </View>
  );
}

export default DetailsScreen;