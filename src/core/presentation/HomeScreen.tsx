import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import CourseCard from "./components/CourseCard";
import { StackNavigatorParamList } from "../navigation/StackNavigatorParamList";
import { UserWithSkillsDTO } from "../domain/model/UserWithSkillsDTO";
import { UserSkill } from "../domain/model/UserSkill";

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Home'>

function HomeScreen({navigation, route}: Props){
    const [userWithSkillsDTO, setCourses] = useState<UserWithSkillsDTO[]>([])

    const navigateToDetailsScreen = (user: UserWithSkillsDTO, userSkill: UserSkill): void => {
        navigation.navigate(
            "Details", 
            {user, userSkill}
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
            try {
                const response = await fetch(
                    "http://192.168.1.14:1337/api/users?fields[0]=username&fields[0]=email&populate[city][fields][0]=cityName&populate[city][fields][0]=zipCode&populate[userSkills][fields][0]=personnalNote&populate[userSkills][fields][0]=skillLevel&populate[userSkills][populate][skill][fields]=skillName&filters[userSkills][id][$gt]=0&filters[city][cityName][$eq]=Rouen", {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer 2407469d8f130469dbb41a9ccf03a1aefc912f23ee6d148f46766762c1a6739507ec0f3ae1e537a20f2002f5219c9a95193786ba6b30f952b1fe506a7e9f38554e9c77104736486e54dfb278e1eb7be3043d1afb226523b365306fd79db48825ae24dff3f65a55a607dc1a27af5cfdece9db44ab6a9915d887e516ebb9f5153e', 
                        'Content-Type': 'application/json'
                    }), 
                });
                if(!response.ok)
                    throw new Error(response.statusText);

                const json = await response.json();
                setCourses(json)
            } catch (error: any) {
                console.log("erreur")
                throw new Error(error.message);
            }
        }
        fetchData()
    }, [])
    return(
        <ScrollView style={styles.box}>
            <Text>Près de chez moi</Text>
            {userWithSkillsDTO.map((user: UserWithSkillsDTO, index:number) => (
                user.userSkills.map((userSkill: UserSkill, index:number) => (
                    <CourseCard 
                        key={index}
                        user={user} 
                        userSkill={userSkill}
                        navigateToDetailsScreen={navigateToDetailsScreen} />
                ))
            ))}
        </ScrollView>
    )
}
export default HomeScreen;