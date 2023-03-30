import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { Course } from "../../core/domain/model/Course";
import { DetailsScreenRouteProp } from "../../core/navigation/StackNavigatorParamList";

// type Props = NativeStackScreenProps<St, 'Details'>

// export function DetailsScreen(){
//   const route = useRoute();
//   const { course } = route.params;
//   return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
//           <Text>itemId: {course.id.toString()}</Text>
//           <Text>title: {course.title}</Text>
//           <Text>description: {course.description}</Text>
//         </View>
//       );
// }
// export default DetailsScreen;
function DetailsScreen() {
  /* 2. Get the param */
  // const { course } = route.params;
  const route = useRoute<DetailsScreenRouteProp>();
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