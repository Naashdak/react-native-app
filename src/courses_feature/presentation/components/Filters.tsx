import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, TouchableHighlight } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { CategoriesWithSkillDTO } from "../../../core/domain/model/CategoriesWithSkillsDTO";
import { Skill } from "../../../core/domain/model/Skill";

export type CategoryFilterItem = {
    label: string,
    value: number
}

type Props = {
    data: CategoriesWithSkillDTO[],
    selectedCategories: number[]
    selectedSkills: Skill[],
    selectableSkills: Skill[],
    onCategorySelection: (value: number) => void
    onSkillSelection: (skill: Skill) => void
    // onSelect: (value: number) => void,
}

type FilterStatus = {
    [key: string]: boolean;
}

type FilterItem = {
    name: string,
    content: FilterContent
}

type FilterContent = {
    value: CategoriesWithSkillDTO[] | Skill[],
    type : 'skill'| 'category'
}

const Filters = ({data, onCategorySelection, onSkillSelection, selectedCategories, selectedSkills, selectableSkills}: Props) => {
    const [options, setOptions] = useState<number[]>([])
    // const toggleHandler = (item: CategoriesWithSkillDTO) => {
    //     const skills = item.skills?.map((item) => item.id).flat()
    //     onSelect(skills)
    //     setOptions((prevSkills) =>
    //         [...prevSkills, ...options]
    //     )
    // }

    const [categoryOptions, setCategoryOptions] = useState<CategoriesWithSkillDTO[]>([])
    const [skillOptions, setSkillOptions] = useState<Skill[]>([])

    // ----------------------------------------------

    // ----------------------------------------------


    // useEffect(() => {
    //     setSkills(props.categories.map(category => category.skills).flat())
    // }, [categoryOptions])

    const toggleCategoryAndSkills = (category: CategoriesWithSkillDTO) => {
        categoryOptions.includes(category) 
            ? setCategoryOptions(categoryOptions.filter(item => item.id === category.id))
            : setCategoryOptions([...categoryOptions, category])
    }

    const [filterStatus, setFilterStatus] = useState<FilterStatus>({
        item1: false,
        item2: false,
    })

    const toggleFilterItem = (itemName: string) => {
        setFilterStatus((prevStatus => ({
            ...prevStatus,
            [itemName]: !prevStatus[itemName]
        })))
    }

    const resetFilters = () => {
        setCategoryOptions([])
        setSkillOptions([])
    }

    // const [categoryOptions, setCategoryOptions] = useState<Category[]>([])
    // const [skillOptions, setSKillOptions] = useState<Skill[]>([])

    // const [categoriesWithSkills, setCategoriesWithSkills] = useState<CategoriesWithSkillDTO[]>([])

    // const toggleCategory = (category: CategoriesWithSkillDTO) => {
    //     if(categoryOptions.includes(category)){
    //         setCategoryOptions(categoryOptions.filter(item => item.id !== category.id))
    //         let skillIdsToRemove: number[] = []
    //         category.skills.forEach(element => {
    //             skillIdsToRemove.push(element.id)
    //         });
    //         setSkillOptions((prevSkill) => 
    //             prevSkill.filter((skill) => !skillIdsToRemove.includes(skill.id))
    //         )
    //         const toRemove = skills.filter((skill) => !skillIdsToRemove.includes(skill.id))
    //         console.log("To Remove : ",toRemove)
    //         props.setFilteringOptions(toRemove)
    //         // props.setFilteringOptions(skillOptions)
    //     } else {
    //         setCategoryOptions([...categoryOptions, category])
    //         setSkillOptions((prevSkills) => [...prevSkills, ...category.skills])
    //         const toAdd = category.skills
    //         const skillsToAdd = category.skills?.map((item) => item).flat()
    //         console.log("To Add :", skillsToAdd)
    //         props.setFilteringOptions(skillsToAdd)
    //         // props.setFilteringOptions([...props.skillFilterOptions, category.skills])
    //     }
    // }

    // const selectCategoryHandler = (item: Category) => {
    //     categoryOptions.includes(item) ? 
    //         categoryOptions.splice(categoryOptions.indexOf(item)) : categoryOptions.push(item)
    //     console.log(categoryOptions)
    // }

    // const renderItem = (content: FilterContent) => {
    //     if(content.type === 'category'){
    //         return(
    //             <View style={styles.categoryListContainer}>
    //                 {(content.value as Category[])?.map((item: Category) => (
    //                     <TouchableOpacity 
    //                         style={[
    //                             styles.categoryButton,
    //                             categoryOptions.includes(item) ? {backgroundColor: '#16A34A'}: {backgroundColor: '#DCDCDC'}
    //                         ]}
    //                         onPress={() => toggleCategory(item)}>
    //                         <Text style={[
    //                             categoryOptions.includes(item) ? {color: 'white'}: {color: 'black'}
    //                             ]}>
    //                                 {item.categoryName}</Text>
    //                     </TouchableOpacity>
    //                 ))}
    //             </View>
    //         )
    //     } else if(content.type === 'skill'){
    //         return(
    //             <View>
    //                 {(content.value as Skill[])?.map((item: Skill) => (
    //                     <Text>{item.skillName}</Text>
    //                 ))}
    //             </View>
    //         )
    //     }
    // }

    // const filteredSkills = []

    //     for(const category of categoryOptions){
    //         for(const skill of category.skills){
    //             if(categoryOptions.includes(category.id)){
    //                 filteredSkills.push(skill)
    //             }
    //         }
    //     }

    // const data: FilterItem[] = [
    //     {name: "Categorie", content:{ value: props.categories, type: 'category'}},
    //     {name: "Compétence", content:{ value: props.categories, type: 'skill'}},
    // ]

    // const renderItem = (content: FilterContent) => {
    //     if(content.type === 'category'){
    //         return(
    //             <View style={styles.categoryListContainer}>
    //                 {(content.value as CategoriesWithSkillDTO[])?.map((item: CategoriesWithSkillDTO, index) => (
    //                     <TouchableOpacity 
    //                         style={[
    //                             styles.categoryButton,
    //                             categoryOptions.includes(item) ? {backgroundColor: '#16A34A'}: {backgroundColor: '#DCDCDC'}
    //                         ]}
    //                         key={index}
    //                         onPress={() => toggleCategory(item)}>
    //                         <Text style={[
    //                             categoryOptions.includes(item) ? {color: 'white'}: {color: 'black'}
    //                             ]}>
    //                                 {item.categoryName}</Text>
    //                     </TouchableOpacity>
    //                 ))}
    //             </View>
    //         )
    //     } else if(content.type === 'skill'){
    //         return(
    //             <View style={styles.categoryListContainer}>
    //                 {(skills as Skill[])?.map((item: Skill, index) => (
    //                     <TouchableOpacity 
    //                         style={[
    //                             styles.categoryButton,
    //                             skillOptions.includes(item) ? {backgroundColor: '#16A34A'}: {backgroundColor: '#DCDCDC'}
    //                         ]}
    //                         key={index}
    //                         onPress={() => {}}>
    //                         <Text style={[
    //                             skillOptions.includes(item) ? {color: 'white'}: {color: 'black'}
    //                             ]}>
    //                                 {item.skillName}</Text>
    //                     </TouchableOpacity>
    //                 ))}
    //             </View>
    //         )
    //     }
    // }

    return(
        <ScrollView>
            <View style={styles.scrollviewContainer}>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {}}>
                    <Text>Reset</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        style={styles.filter}
                        onPress={() => toggleFilterItem("Catégorie")}>
                        <Text style={styles.filterTitle}>Catégorie</Text>
                        <View style={styles.options}>
                            <Text>{filterStatus["Catégorie"] ? "Voir moins" : "Voir plus"}</Text>
                            <FontAwesome name={filterStatus["Catégorie"] ? "chevron-down" : "chevron-right"} size={16}/>
                        </View>
                    </TouchableOpacity>
                    {filterStatus["Catégorie"] ? 
                        <View style={styles.categoryListContainer}>
                            {data?.map((item, index) => (
                                <TouchableOpacity 
                                    style={[
                                        styles.categoryButton,
                                        selectedCategories.includes(item.id) ? {backgroundColor: '#16A34A'}: {backgroundColor: '#DCDCDC'}
                                    ]}
                                    key={index}
                                    onPress={() => onCategorySelection(item.id)}>
                                    <Text style={[
                                        selectedCategories.includes(item.id) ? {color: 'white'}: {color: 'black'}
                                        ]}>
                                            {item.categoryName}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        : null
                    }
                    <TouchableOpacity
                        style={styles.filter}
                        onPress={() => toggleFilterItem("Compétence")}>
                        <Text style={styles.filterTitle}>Compétence</Text>
                        <View style={styles.options}>
                            <Text>{filterStatus["Compétence"] ? "Voir moins" : "Voir plus"}</Text>
                            <FontAwesome name={filterStatus["Compétence"] ? "chevron-down" : "chevron-right"} size={16}/>
                        </View>
                    </TouchableOpacity>
                    {filterStatus["Compétence"] ? 
                        <View style={styles.categoryListContainer}>
                            {selectableSkills?.map((item, index) => (
                                <TouchableOpacity 
                                    style={[
                                        styles.categoryButton,
                                        selectedSkills.includes(item) ? {backgroundColor: '#16A34A'}: {backgroundColor: '#DCDCDC'}
                                    ]}
                                    key={index}
                                    onPress={() => {
                                        onSkillSelection(item)
                                    }}>
                                    <Text style={[
                                        selectedSkills.includes(item) ? {color: 'white'}: {color: 'black'}
                                        ]}>
                                            {item.skillName}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        : null
                    }
                </View>
                {/* <View> */}
                {/* {data?.map((items, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.filter}
                            onPress={() => toggleFilterItem(items.name)}>
                            <Text style={styles.filterTitle}>{items.name}</Text>
                            <View style={styles.options}>
                                <Text>{filterStatus[items.name] ? "Voir moins" : "Voir plus"}</Text>
                                <FontAwesome name={filterStatus[items.name] ? "chevron-down" : "chevron-right"} size={16}/>
                            </View>
                        </TouchableOpacity>
                        {filterStatus[items.name] ? 
                            <View> */}
                                {/* {items.skills?.map((item: Skill) => (
                                    <View>
                                        <TouchableOpacity 
                                            style={[
                                                styles.categoryButton,
                                                categoryOptions.includes(item) ? {backgroundColor: '#16A34A'}: {backgroundColor: '#DCDCDC'}
                                            ]}
                                            onPress={() => toggleCategory(item)}>
                                            <Text style={[
                                                categoryOptions.includes(item) ? {color: 'white'}: {color: 'black'}
                                                ]}>
                                                    {item.categoryName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))} */}
                                {/* {renderItem(items.content)} */}
                            {/* </View>
                            : null
                        }
                        <View style={styles.divider} /> */}
                    {/* </View> */}
                {/* ))}
                </View> */}
                {/* <TouchableHighlight
                    style={styles.buttonClickContainer}
                    onPress={() => {}}>
                        <View style={styles.buttonContainer}>
                            <FontAwesome name='check' size={26} color={'white'} />
                            <Text style={styles.buttonText}>Valider</Text>
                        </View>
                </TouchableHighlight> */}
            </View>
        </ScrollView>
    )
}

export default Filters

const styles = StyleSheet.create({
    resetButton : {
        alignSelf: 'flex-end',
        marginRight: 25,
        marginBottom: 10
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    },
    radioFormContainer: {
        gap: 20
    },
    radioButton: {
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    radioButtonLabel: {
        fontSize: 18
    },
    radioFormTitle: {
        color: 'grey',
        paddingHorizontal: 18,
        fontSize: 18,
        marginBottom: 20
    },
    filterContainer: {
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 60
    },
    filterTitle: {
        fontSize: 20,
        color: 'grey',
    },
    divider: {
        height: 1,
        backgroundColor: 'grey',
        opacity: 0.2
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    optionListContainer: {
        padding: 20
    },
    categoryListContainer: {
        padding: 10,
        gap: 10,
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    categoryButton: {
        borderRadius: 15,
        padding: 15,
    },
    selectedOption: {
        backgroundColor: 'red'
    },
    unselectedOption: {
        backgroundColor: 'grey'
    },
    optionText: {
        color: 'white'
    },
    buttonClickContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#16A34A',
        borderRadius: 5,
        padding: 5,
        marginTop: 35,
        marginBottom: 5,
        width: 150,
        alignSelf: "center",
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
    scrollviewContainer: {
        flexDirection: 'column',
        alignContent: 'stretch',
        justifyContent: 'space-between',
    }
})