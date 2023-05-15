import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, TouchableHighlight } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { CategoriesWithSkillDTO } from "../../../core/domain/model/CategoriesWithSkillsDTO";
import { Skill } from "../../../core/domain/model/Skill";
import { ScrollView } from "react-native-gesture-handler";

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
}

type FilterStatus = {
    [key: string]: boolean;
}

const Filters = ({data, onCategorySelection, onSkillSelection, selectedCategories, selectedSkills, selectableSkills}: Props) => {
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

    return(
        <View style={styles.scrollviewContainer}>
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
        </View>
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