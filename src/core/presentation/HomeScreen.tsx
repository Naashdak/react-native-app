import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Course } from "../domain/model/Course";
import { data } from "../utils/DummyData";
import { ScrollView, StyleSheet } from "react-native";
import CourseCard from "./components/CourseCard";
import { StackNavigatorParamList } from "../navigation/StackNavigatorParamList";

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Home'>

export function HomeScreen({navigation}: Props){
    const [courses, setCourses] = useState<Course[]>([])

    const navigateToDetailsScreen = (course: Course) => {
        navigation.navigate(
            "Details", 
            {course}
        )
    }
    const styles = StyleSheet.create({
        box: {
          flex: 1,
          padding: 10,
          rowGap: 10,
          columnGap: 10
        }
    })
  
    useEffect(() => {
        const fetchData = () => {
            const result = data
            setCourses(result)
        }
  
        fetchData()
    }, [])
    return(
        <ScrollView style={styles.box}>
            {courses.map((course: Course) => (
                CourseCard(course, {navigateToDetailsScreen})
            ))}
        </ScrollView>
    )
}