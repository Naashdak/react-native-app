import 'react-native-gesture-handler';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { useEffect, useState } from "react";
import { SafeAreaView , Text, View, StyleSheet, FlatList, RefreshControl, Button, TouchableHighlight } from "react-native";
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
import { IGeolocationService } from '../../core/domain/interfaces/IGeolocationService';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BottomSheet from '../../core/presentation/components/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Courses'>

export function CoursesScreen({navigation, route}: Props){
    
    const courseService = container.get<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE);
    const cityService = container.get<ICityService>(SERVICE_IDENTIFIER.CITYSERVICE);
    const geolocationService = container.get<IGeolocationService>(SERVICE_IDENTIFIER.GEOLOCATIONSERVICE);

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
                console.log(nearbyCities)
                console.log("taille :", nearbyCities.length)
                if(nearbyCities.length == 0){
                    console.log("coucou")
                    const cityName = await geolocationService
                        .getCityByCoordinates(
                            location ? location!.coords.latitude :49.1244253,
                            location ? location!.coords.longitude: 2.4535435
                        )
                    console.log(cityName)
                    setCities([cityName])
                }
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
        <GestureHandlerRootView>
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
            <View style={styles.filters}>
                <TouchableHighlight
                    style={styles.buttonClickContainer}
                    onPress={() => {}}>
                        <View style={styles.buttonContainer}>
                            <FontAwesome name='sort' size={32} />
                            <Text style={styles.buttonText}>Trier par</Text>
                        </View>

                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.buttonClickContainer}
                    onPress={() => {}}>
                        <View style={styles.buttonContainer}>
                            <FontAwesome name='filter' size={32} />
                            <Text style={styles.buttonText}>Filtres</Text>
                        </View>

                </TouchableHighlight>
            </View>
            <ScrollView style={styles.list}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }>
                {courses?.map((course: UserSkillsWithUserAndCityDTO, index: number) => (
                    <CourseCard key={index} course={course} navigateToDetailsScreen={navigateToDetailsScreen}/>
                ))}
                
            </ScrollView>
            <BottomSheet />
        </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
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
    filters: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonClickContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#009D6E',
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        width: 150
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonIcon: {

    },
    buttonText: {
        fontSize: 18,
        color: '#FAFAFA',
        marginLeft: 10,
        marginTop: 2,
    },
    list: {
        height: '93%'
    }

})