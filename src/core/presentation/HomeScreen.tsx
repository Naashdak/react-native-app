import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Course } from "../domain/model/Course";
import { data } from "../utils/DummyData";
import { RootStackParamList } from "./RootStackParamList";
import { ScrollView, StyleSheet } from "react-native";
import CourseCard from "./components/CourseCard";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export function HomeScreen({navigation}: Props){
    const [courses, setCourses] = useState<Course[]>([])

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
            {courses.map((item: Course) => (
                CourseCard(item, {navigation})
            ))}
        </ScrollView>
    )
}