import 'react-native-gesture-handler';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView , Text, View, StyleSheet, FlatList, RefreshControl, Button, TouchableHighlight } from "react-native";
import CourseCard from "./components/CourseCard";
import {container} from "../../core/di/Inversify.config";
import { ICourseService } from "../domain/ICourseService";
import SERVICE_IDENTIFIER from "../../core/di/inversify.identifiers";
import React from "react";
import { UserSkillsWithUserAndCityDTO } from "../domain/model/UserSkillsWithUserAndCityDTO";
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider';
import { ScrollView } from 'react-native-gesture-handler';
import { ICityService } from '../../core/domain/interfaces/ICityService';
import { IGeolocationService } from '../../core/domain/interfaces/IGeolocationService';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BottomSheet, { BottomSheetRefProps } from '../../core/presentation/components/BottomSheet';
import FilterBottomSheet, { FilterBottomSheetProps } from './components/FilterBottomSheet';
import { ISkillService } from '../domain/ISkillService';
import { Skill } from '../../core/domain/model/Skill';
import { ICategoryService } from '../domain/ICategoryService';
import { CategoriesWithSkillDTO } from '../../core/domain/model/CategoriesWithSkillsDTO';

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Courses'>

export function CoursesScreen({navigation, route}: Props){
    
    const courseService = container.get<ICourseService>(SERVICE_IDENTIFIER.COURSESERVICE);
    const cityService = container.get<ICityService>(SERVICE_IDENTIFIER.CITYSERVICE);
    const geolocationService = container.get<IGeolocationService>(SERVICE_IDENTIFIER.GEOLOCATIONSERVICE);
    const skillService = container.get<ISkillService>(SERVICE_IDENTIFIER.SKILLSERVICE);
    const categoryService = container.get<ICategoryService>(SERVICE_IDENTIFIER.CATEGORYSERVICE);
    

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
    const [categoriesWithSkills, setCategoriesWithSkills] = useState<CategoriesWithSkillDTO[]>([])

    const fetchCategoriesWithSkills = async () => {
        try {
            setCategoriesWithSkills(await categoryService.getCategoriesWithSkills())
        } catch (error: any) {
            setError(error.message)
        }
    }

    

    // range slider
    const [radius, setRadius] = useState<number>()
    const [labelRadius, setLabelRadius] = useState<number>(10)

    const ref = useRef<BottomSheetRefProps>(null)
    const refFilters = useRef<FilterBottomSheetProps>(null)
    const onPress = useCallback(() => {
        const isActive = ref?.current?.isActive()
        if(isActive){
            ref?.current?.scrollTo(0)
        } else {
            ref?.current?.scrollTo(-125)
        }
    }, [])

    const onPressFilters = useCallback(() => {
        const isActive = refFilters?.current?.isActive()
        if(isActive){
            refFilters?.current?.scrollTo(0)
        } else {
            refFilters?.current?.scrollTo(-400)
        }
    }, [])

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
                if(nearbyCities.length == 0){
                    const cityName = await geolocationService
                        .getCityByCoordinates(
                            location ? location!.coords.latitude :49.1244253,
                            location ? location!.coords.longitude: 2.4535435
                        )
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

    useEffect(() => {
        fetchCategoriesWithSkills()
    }, [refFilters.current?.isActive])

    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [selectableSkills, setSelectableSkills] = useState<Skill[]>([])


    const handleCategorySelection = (categoryId: number) => {
        // Check if the category is already selected
        const categoryIndex = selectedCategories.indexOf(categoryId);
        const categorySkills = categoriesWithSkills.find((category) => category.id === categoryId)!.skills.flat()
        if (categoryIndex === -1) {
            // Category is not selected, add it to the selected categories
            setSelectedCategories([...selectedCategories, categoryId]);
            setSelectableSkills([...selectableSkills, ...categorySkills])
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
            setSelectedSkills(selectedSkills.filter((item) => item !== skill))
        } else {
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


    const [sortingOption, setSortingOption] = useState(0)

    const sortBy = (courses: UserSkillsWithUserAndCityDTO[], selectedOptions: CategoriesWithSkillDTO[]) => {

        
        console.log("options : ",selectedOptions)
        const listOfSkills = selectedOptions?.map((item) => item.skills).flat()
        // TODO : handle when several categories are selected with some with selected skills and other with not
        const categories = selectedOptions.map((item) => item)
        const selectedCategoriesWithoutSelectedSkill = listOfSkills.filter((item) => !selectedSkills.includes(item))
        console.log("test jpp pls : ", selectedCategoriesWithoutSelectedSkill)
        const skillsId = selectedSkills?.map((item) => item.id)
        const test = listOfSkills?.map((item) => item.id)

        const jpp = categoriesWithSkills.filter((category) => {
            const categorySelected = selectedCategories.includes(category.id)
            if(!categorySelected){
                return false
            }

            const skillsSelected = selectableSkills.some((skill) => category.skills.includes(skill))
            if(!skillsSelected){
                return true
            }
            return skillsSelected
        })

        // const filter = categoriesWithSkills
        // .filter((category) => {
        //     return selectedCategories.includes(category.id)
        // }).map((category) => {
        //     const skillsnames = category.skills.map((skill) => skill.skillName)
        //     const skills = category.skills.map((skill) => skill)
        //     if(selectableSkills.some(skill => !skillsnames.includes(skill.skillName))){
        //         selectedSkills.push(...skills)
        //     }
        //     return {categoryName: category.categoryName, id: category.id, skills: skills}
        // })

        // console.log("filters : ", filter)


        // if categoy is selected
        //   if selected skills dont have category's skill
        //     return true
        //   else 
        //     return selected skills 

        if(sortingOption === 0){
            
            return courses
                .filter((item) => {
                    if(selectedCategories.length === 0){
                        return item
                    }
                    if(selectedSkills.length === 0){
                        // console.log("selectedSkills.length = 0")
                        return test.includes(item.skill.id)
                    }
                    const truc = listOfSkills.some((item) => {
                        console.log('item : ', item)
                        const t = test.includes(item.id)
                        console.log(t)
                        return t
                    })
                    console.log(truc)
                    // if(listOfSkills.some((item) => !test.includes(item.id))){
                    //     return
                    // }
                    return skillsId.includes(item.skill.id)
                })
                .sort((a, b) => a.user.city.cityName.localeCompare(b.user.city.cityName))
        } else if(sortingOption === 1){
            return courses
                .filter((item) => {
                    console.log(selectedSkills.length)
                    if(selectedCategories.length === 0){
                        return item
                    }
                    if(selectedSkills.length === 0){
                        return test.includes(item.skill.id)
                    }
                    return skillsId.includes(item.skill.id)
                })
                .sort((a, b) => a.user.username.localeCompare(b.user.username))
        } else if(sortingOption === 2){
            return courses
                .filter((item) => {
                    if(selectedCategories.length === 0){
                        return item
                    }
                    if(selectedSkills.length === 0){
                        return test.includes(item.skill.id)
                    }
                    return skillsId.includes(item.skill.id)
                })
                .sort((a, b) => a.skill.skillName.localeCompare(b.skill.skillName))
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header} /> */}
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
                    onPress={onPress}>
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
                //TODO : issue with scroll  
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }>
                {sortBy(courses, filteredResults)?.map((course: UserSkillsWithUserAndCityDTO, index: number) => (
                    <CourseCard key={index} course={course} navigateToDetailsScreen={navigateToDetailsScreen}/>
                ))}
                
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
        height: '82%'
    }
})