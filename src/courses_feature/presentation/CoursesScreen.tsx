import 'react-native-gesture-handler';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView , ScrollView, Text, View, StyleSheet, FlatList } from "react-native";
import CourseCard from "./components/CourseCard";
import containter from "../../core/di/Inversify.config";
import { ICourseService } from "../domain/ICourseService";
import SERVICE_IDENTIFIER from "../../core/di/inversify.identifiers";
import Loader from "../../core/presentation/components/Loader";
import React from "react";
import { UserSkillsWithUserAndCityDTO } from "../domain/model/UserSkillsWithUserAndCityDTO";
import * as Location from 'expo-location';
import { IGeolocationService } from "../../core/domain/IGeolocationService";
import Slider from '@react-native-community/slider';

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Courses'>

export function CoursesScreen({navigation, route}: Props){
    
    const courseService = containter.get<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE);
    const geolocationService = containter.get<IGeolocationService>(SERVICE_IDENTIFIER.GEOLOCATIONSERVICE);

    const [courses, setCourses] = useState<UserSkillsWithUserAndCityDTO[]>();
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

    // range slider
    const [radius, setRadius] = useState<number>()
    const [labelRadius, setLabelRadius] = useState<number>(10)

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    // Get geolocation
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setRadius(10)
        })();
    }, []);

    useEffect(() => {
        const getNearbyCities = async() => {
            try {
                const response = await geolocationService.getNearbyCities(location!.coords.latitude, location!.coords.longitude)
                if(!response.ok){
                    setError("Erreur")
                }
                const json = await response.json()
                const nearbyCities = json.list.filter((city: any) => {
                    const distance = getDistance(location!.coords.latitude, location!.coords.longitude, city.coord.lat, city.coord.lon);
                    return distance <= radius!;
                }).map((city: any) => city.name);

                setCities(nearbyCities)
            } catch (error: any) {
                setError(error.message)
            }
        }
        getNearbyCities()
    }, [radius])

    useEffect(() => {
        const fetchData = async() => {
            try {
                setLoading(true);
                const response = await courseService.getCourses(cities!);
                if(!response.ok){
                    setError(response.statusText)
                }

                const json = await response.json();
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
    }, [cities])

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.slider}>
                <Text style={styles.sliderText}>Rayon : {labelRadius}km</Text>
                <Slider
                    style={styles.sliderContent}
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

            <FlatList style={styles.list}
                data={courses}
                renderItem={(item) => (
                    <CourseCard key={item.index} course={item.item} navigateToDetailsScreen={navigateToDetailsScreen}/>
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            <Loader isLoading={loading}/>
        </SafeAreaView>
    )
}

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
};
  
const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
};

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