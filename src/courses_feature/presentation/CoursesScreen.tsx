import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView , ScrollView, Text, View } from "react-native";
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
    const [error, setError] = useState<string>("")
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
                if(!result.ok){
                    setError(result.statusText)
                }

                const json = await result.json();
                if(json.data.length == 0){
                    setError("Aucun cours à proximité ...")
                } else {
                    setCourses(json.data)
                }
                
            } catch (error: any) {
                setError(error.message)
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
            {error != "" ?? <Text>erreur</Text>}
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