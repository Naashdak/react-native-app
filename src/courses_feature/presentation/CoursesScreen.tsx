import 'react-native-gesture-handler';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView , Text, View, StyleSheet, RefreshControl, TouchableHighlight, ScrollView, Dimensions } from "react-native";
import CourseCard from "./components/CourseCard";
import {container} from "../../core/di/Inversify.config";
import { ICourseService } from "../domain/ICourseService";
import SERVICE_IDENTIFIER from "../../core/di/inversify.identifiers";
import React from "react";
import { UserSkillsWithUserAndCityDTO } from "../domain/model/UserSkillsWithUserAndCityDTO";
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider';
import { ICityService } from '../../core/domain/interfaces/ICityService';
import { IGeolocationService } from '../../core/domain/interfaces/IGeolocationService';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BottomSheet, { BottomSheetRefProps } from '../../core/presentation/components/BottomSheet';
import FilterBottomSheet, { FilterBottomSheetProps } from './components/FilterBottomSheet';
import { ISkillService } from '../domain/ISkillService';
import { Skill } from '../../core/domain/model/Skill';
import { ICategoryService } from '../domain/ICategoryService';
import { CategoriesWithSkillDTO } from '../../core/domain/model/CategoriesWithSkillsDTO';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Courses'>
const DEFAULT_LATITUDE = 49.1244253
const DEFAULT_LONGITUDE = 2.4535435
const DEFAULT_RADIUS = 10
const {height: SCREEN_HEIGHT} = Dimensions.get('window')

export function CoursesScreen({navigation, route}: Props){
    
    //#region DI
    const courseService = container.get<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE);
    const cityService = container.get<ICityService>(SERVICE_IDENTIFIER.CITYSERVICE);
    const geolocationService = container.get<IGeolocationService>(SERVICE_IDENTIFIER.GEOLOCATIONSERVICE);
    const skillService = container.get<ISkillService>(SERVICE_IDENTIFIER.SKILLSERVICE);
    const categoryService = container.get<ICategoryService>(SERVICE_IDENTIFIER.CATEGORYSERVICE);
    //#endregion

    //#region States
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>()

    const [courses, setCourses] = useState<UserSkillsWithUserAndCityDTO[]>([]);
    const [location, setLocation] = useState<Location.LocationObject>();
    const [cities, setCities] = useState<string[]>()
    const [categoriesWithSkills, setCategoriesWithSkills] = useState<CategoriesWithSkillDTO[]>([])

    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [selectableSkills, setSelectableSkills] = useState<Skill[]>([])
    const [sortingOption, setSortingOption] = useState(0)

    // range slider
    const [radius, setRadius] = useState<number>()
    const [labelRadius, setLabelRadius] = useState<number>(DEFAULT_RADIUS)
    //#endregion

    //#region Functions
    const navigateToDetailsScreen = (course: UserSkillsWithUserAndCityDTO): void => {
        navigation.navigate(
            "Details", 
            {course}
        )
    }

    // Fill bottom sheet options
    const fetchCategoriesWithSkills = async () => {
        try {
            setCategoriesWithSkills(await categoryService.getCategoriesWithSkills())
        } catch (error: any) {
            setError(error.message)
        }
    }

    const fetchCourses = async() => {
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
    //#endregion

    //#region UI
    const onRefresh = React.useCallback(() => {
        fetchCourses()
    }, []);
    //#endregion
    
    //#region Handle option selection

    // Sort By BottomSheet
    const ref = useRef<BottomSheetRefProps>(null)
    // Handle bottom sheet visibility
    const onPressSort = useCallback(() => {
        const isActive = ref?.current?.isActive()
        if(isActive){
            // Close
            ref?.current?.scrollTo(0)
        } else {
            // Open
            ref?.current?.scrollTo(-SCREEN_HEIGHT/5)
        }
    }, [])

    // Filter BottomSheet
    const refFilters = useRef<FilterBottomSheetProps>(null)
    // Handle bottom sheet visibility
    const onPressFilters = useCallback(() => {
        const isActive = refFilters?.current?.isActive()
        if(isActive){
            // Close
            refFilters?.current?.scrollTo(0)
        } else {
            // Open
            refFilters?.current?.scrollTo(-SCREEN_HEIGHT/1.8)
        }
    }, [])
    
    const handleCategorySelection = (categoryId: number) => {
        // Check if the category is already selected
        const categoryIndex = selectedCategories.indexOf(categoryId);
        const categorySkills = categoriesWithSkills.find((category) => category.id === categoryId)!.skills.flat()
        if (categoryIndex === -1) {
            // Category is not selected, add it to the selected categories
            setSelectedCategories([...selectedCategories, categoryId]);
            setSelectableSkills([...selectableSkills, ...categorySkills])
            setSelectedSkills([...selectedSkills, ...categorySkills])
        } else {
            // Category is already selected, remove it from the selected categories
            setSelectedCategories(selectedCategories.filter((category) => category !== categoryId));
            // Also remove any selected skills that belong to this category
            setSelectedSkills(selectedSkills.filter((skill) => {
                const skillCategory = categoriesWithSkills.find((category) => category.skills.includes(skill))
                return skillCategory?.id !== categoryId
            }))
            setSelectableSkills(selectableSkills.filter((skill) => {
                const skillCategory = categoriesWithSkills.find((category) => category.skills.includes(skill))
                return skillCategory?.id !== categoryId
            }))
        }
    };
      
    const handleSkillSelection = (skill: Skill) => {
        if(selectedSkills.find((item) => item === skill)){
            // Skill is already selected, remove it
            setSelectedSkills(selectedSkills.filter((item) => item !== skill))
        } else {
            // Skill is not selected, add it
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const filteredResults = categoriesWithSkills.filter((result) => {
        const categorySelected = selectedCategories.includes(result.id)
        if(!categorySelected){
            return false
        }
        if(selectedSkills.length === 0){
            return true
        }

        const skillsSelected = result.skills.some((skill) => selectedSkills.includes(skill))
        return skillsSelected
    })

    //#endregion

    //#region Use effects
    // Get permission then geolocation
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

    // Get nearbyCities when radius value changed
    useEffect(() => {
        if(!radius){
            return
        }
        const getNearbyCities = async() => {
            try {
                const nearbyCities = await cityService
                    .getNearbyCitiesWithinRadius(
                        radius ?? DEFAULT_RADIUS,
                        location ? location!.coords.latitude : DEFAULT_LATITUDE,
                        location ? location!.coords.longitude: DEFAULT_LONGITUDE  
                    )
                // Handle case : Geocoding api can't find nearby cities
                if(nearbyCities.length == 0){
                    // Get city by location
                    const cityName = await geolocationService
                        .getCityByCoordinates(
                            location ? location!.coords.latitude : DEFAULT_LATITUDE,
                            location ? location!.coords.longitude: DEFAULT_LONGITUDE
                        )
                    setCities([cityName])
                }else {
                    setCities(nearbyCities)
                }
            } catch (error: any) {
                setError(error.message)
            }
        }
        getNearbyCities()
    }, [radius])

    useEffect(() => {
        // When cities value changed, reload
        fetchCourses()
    }, [cities])

    useEffect(() => {
        fetchCategoriesWithSkills()
    }, [])
    //#endregion

    // Sort and filter Courses according to the selected options
    const sortBy = (courses: UserSkillsWithUserAndCityDTO[], selectedOptions: CategoriesWithSkillDTO[]) => {
        // List of skills id from selected categories
        const listOfSkills = selectedOptions?.map((item) => item.skills).flat().map((skill) => skill.id)
        // Selected skills id
        const selectedSkillIds = selectedSkills?.map((item) => item.id)

        
        if(sortingOption === 0){ // Sort by City
            return courses
                .filter((item) => {
                    if(selectedCategories.length === 0){
                        return item
                    }
                    if(selectedSkills.length === 0){
                        return listOfSkills.includes(item.skill.id)
                    }
                    return selectedSkillIds.includes(item.skill.id)
                })
                .sort((a, b) => a.user.city.cityName.localeCompare(b.user.city.cityName))
        } else if(sortingOption === 1){ // Sort by User
            return courses
                .filter((item) => {
                    if(selectedCategories.length === 0){
                        return item
                    }
                    if(selectedSkills.length === 0){
                        return listOfSkills.includes(item.skill.id)
                    }
                    return selectedSkillIds.includes(item.skill.id)
                })
                .sort((a, b) => a.user.username.localeCompare(b.user.username))
        } else if(sortingOption === 2){ // Sort by Skill
            return courses
                .filter((item) => {
                    if(selectedCategories.length === 0){
                        return item
                    }
                    if(selectedSkills.length === 0){
                        return listOfSkills.includes(item.skill.id)
                    }
                    return selectedSkillIds.includes(item.skill.id)
                })
                .sort((a, b) => a.skill.skillName.localeCompare(b.skill.skillName))
        }
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <LinearGradient
                colors={['transparent','#0F172A']}
                style={styles.background}/>
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
                    thumbTintColor="#16A34A"
                />
            </View>
            <View style={styles.filters}>
                <TouchableHighlight
                    style={styles.buttonClickContainer}
                    onPress={onPressSort}>
                        <View style={styles.buttonContainer}>
                            <FontAwesome name='sort' size={26} color={'white'} />
                            <Text style={styles.buttonText}>Trier par</Text>
                        </View>

                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.buttonClickContainer}
                    onPress={onPressFilters}>
                        <View style={styles.buttonContainer}>
                            <FontAwesome name='filter' size={26} color={'white'} />
                            <Text style={styles.buttonText}>Filtres</Text>
                        </View>

                </TouchableHighlight>
            </View>

            <ScrollView style={styles.list}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }>
                {courses ? sortBy(courses, filteredResults)?.map((course: UserSkillsWithUserAndCityDTO, index: number) => (
                    <CourseCard key={index} course={course} navigateToDetailsScreen={navigateToDetailsScreen}/>
                )): <Text style={{alignSelf: 'center'}}>Erreur : {error}</Text>}
                
            </ScrollView>
            <BottomSheet ref={ref} setSortByOption={setSortingOption} />
            <FilterBottomSheet 
                ref={refFilters} 
                categories={categoriesWithSkills} 
                handleCategorySelection={handleCategorySelection} 
                handleSkillSelection={handleSkillSelection} 
                selectedCategories={selectedCategories}
                selectedSkills={selectedSkills}
                selectableSkills={selectableSkills}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 100,
        backgroundColor: 'white'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: SCREEN_HEIGHT,
      },
    slider: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    sliderContent: {
        width: 200,
        height: 60,
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
        backgroundColor: '#16A34A',
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        width: 150
    },
    buttonContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        height: 30
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
        height: '80%'
    }
})