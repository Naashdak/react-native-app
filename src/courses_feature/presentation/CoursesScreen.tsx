import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView , ScrollView, Text } from "react-native";
import CourseCard from "./components/CourseCard";
import containter from "../../core/di/Inversify.config";
import { ICourseService } from "../domain/ICourseService";
import SERVICE_IDENTIFIER from "../../core/di/inversify.identifiers";
import Loader from "../../core/presentation/components/Loader";
import React from "react";
import { UserSkillsWithUserAndCityDTO } from "../domain/model/UserSkillsWithUserAndCityDTO";

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Courses'>

export function CoursesScreen({navigation, route}: Props){
    const courseService = containter.get<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE);
    const [courses, setCourses] = useState<UserSkillsWithUserAndCityDTO[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const navigateToDetailsScreen = (course: UserSkillsWithUserAndCityDTO): void => {
        navigation.navigate(
            "Details", 
            {course}
        )
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    useEffect(() => {
        const fetchData = async() => {
            try {
                setLoading(true);
                const result = await courseService.getCourses();
                setCourses(result)
            } catch (error: any) {
                throw new Error(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [])

    return(
        <SafeAreaView>
            <Text>Près de chez moi</Text>
            <Loader isLoading={loading}/>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {courses?.map((course: UserSkillsWithUserAndCityDTO, index: number) => (
                    <CourseCard 
                        key={index}
                        course={course} 
                        navigateToDetailsScreen={navigateToDetailsScreen} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}