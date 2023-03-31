import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Course } from "../domain/model/Course";
import { data } from "../utils/DummyData";
import { ScrollView, StyleSheet } from "react-native";
import CourseCard from "./components/CourseCard";
import { StackNavigatorParamList } from "../navigation/StackNavigatorParamList";
import { User } from "../domain/model/User";

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Home'>

function HomeScreen({navigation, route}: Props){
    const [courses, setCourses] = useState<User[]>([])

    const navigateToDetailsScreen = (user: User): void => {
        navigation.navigate(
            "Details", 
            {user}
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
        const fetchData = async() => {
            // const result = data
            // setCourses(result)
                try {
                    console.log("hello")
                    console.log(process.env.API_TOKEN)
                    const response = await fetch("http://localhost:1337/api/users?populate[0]=userSkills", {
                        method: 'GET',
                        headers:  new Headers({
                            "Content-Type": "application/json",
                            Autorization: `Bearer 2407469d8f130469dbb41a9ccf03a1aefc912f23ee6d148f46766762c1a6739507ec0f3ae1e537a20f2002f5219c9a95193786ba6b30f952b1fe506a7e9f38554e9c77104736486e54dfb278e1eb7be3043d1afb226523b365306fd79db48825ae24dff3f65a55a607dc1a27af5cfdece9db44ab6a9915d887e516ebb9f5153e`
                        })
                    });
                    if(!response.ok)
                        throw new Error(response.statusText);
                    console.log(response)
                    const json = await response.json();
                    const data = json as {
                        results: User[]
                    }
                    setCourses(data.results)
                    
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
  
        fetchData()
    }, [])
    return(
        <ScrollView style={styles.box}>
            {courses.map((user: User) => (
                <CourseCard 
                    user={user} 
                    navigateToDetailsScreen={navigateToDetailsScreen} />
            ))}
        </ScrollView>
    )
}
export default HomeScreen;