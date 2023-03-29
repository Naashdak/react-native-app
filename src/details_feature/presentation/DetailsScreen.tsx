import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../core/presentation/RootStackParamList"

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>

export function DetailsScreen({ route }: Props) {
  /* 2. Get the param */
  const { course } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {course.id.toString()}</Text>
      <Text>title: {course.title}</Text>
      <Text>description: {course.description}</Text>
    </View>
  );
}