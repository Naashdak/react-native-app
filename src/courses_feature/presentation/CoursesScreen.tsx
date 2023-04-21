import 'react-native-gesture-handler';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { useEffect, useState } from "react";
import { SafeAreaView , Text, View, StyleSheet, FlatList, RefreshControl } from "react-native";
import CourseCard from "./components/CourseCard";
import {container} from "../../core/di/Inversify.config";
import { ICourseService } from "../domain/ICourseService";
import SERVICE_IDENTIFIER from "../../core/di/inversify.identifiers";
import React from "react";
import { UserSkillsWithUserAndCityDTO } from "../domain/model/UserSkillsWithUserAndCityDTO";
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider';
import { City } from '../../core/domain/model/City';
import { ScrollView } from 'react-native-gesture-handler';
import { ICityService } from '../../core/domain/interfaces/ICityService';

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Courses'>

export function CoursesScreen({navigation, route}: Props){
    
    const courseService = container.get<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE);
    const cityService = container.get<ICityService>(SERVICE_IDENTIFIER.CITYSERVICE);

    const [courses, setCourses] = useState<UserSkillsWithUserAndCityDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>()
    const navigateToDetailsScreen = (course: UserSkillsWithUserAndCityDTO): void => {
        navigation.navigate(
            "Details", 
            {course}
        )
    }

    const [location, setLocation] = useState<Location.LocationObject>();
    const [cities, setCities] = useState<string[]>()
    const [actualCity, setActualCity] = useState<City>()

    // range slider
    const [radius, setRadius] = useState<number>()
    const [labelRadius, setLabelRadius] = useState<number>(10)

    const onRefresh = React.useCallback(() => {
        fetchData()
      }, []);

    const fetchData = async() => {
        try {
            setLoading(true);
            const courses = await courseService.getCourses(cities!);
            setCourses(courses)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    // Get geolocation
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                setRadius(10)
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setRadius(10)
        })();
    }, []);

    useEffect(() => {
        if(!radius){
            return
        }
        const getNearbyCities = async() => {
            try {
                const nearbyCities = await cityService
                    .getNearbyCitiesWithinRadius(
                        radius ?? 10,
                        location ? location!.coords.latitude :49.1244253,
                        location ? location!.coords.longitude: 2.4535435  
                    )
                setCities(nearbyCities)
            } catch (error: any) {
                setError(error.message)
            }
        }
        getNearbyCities()
    }, [radius])

    useEffect(() => {
        fetchData()
    }, [cities])

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.slider}>
                <Text style={styles.sliderText}>Rayon : {labelRadius}km</Text>
                <Slider
                    style={styles.sliderContent}
                    value={radius}
                    minimumValue={1}
                    maximumValue={50}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onSlidingComplete={(value) => {
                        setRadius(value)
                    }}
                    onValueChange={(value) => {
                        setLabelRadius(value)
                    }}
                    step={1}
                />
            </View>
            <ScrollView style={styles.list}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }>
                {courses?.map((course: UserSkillsWithUserAndCityDTO, index: number) => (
                    <CourseCard key={index} course={course} navigateToDetailsScreen={navigateToDetailsScreen}/>
                ))}
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    slider: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    sliderContent: {
        width: 200,
        height: 60
    },
    sliderText: {
        fontSize: 18
    },
    list: {
        height: '93%'
    }

})