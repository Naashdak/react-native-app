import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import { UserSkillsWithUserAndCityDTO } from '../../domain/model/UserSkillsWithUserAndCityDTO';

type Props = {
    course: UserSkillsWithUserAndCityDTO
    navigateToDetailsScreen(courses:UserSkillsWithUserAndCityDTO):void;
}

const CourseCard: FunctionComponent<Props> = (props) => {
    return (
        <View style={styles.card}>
            <TouchableNativeFeedback
                    onPress={() =>
                        props.navigateToDetailsScreen(props.course)
                    }>
                <View>
                    <View>
                        <Text>Pseudo : {props.course.user.username}</Text>
                        <Text>Ville : {props.course.user.city.cityName} {props.course.user.city.zipCode}</Text>
                        <Text>Compétence : {props.course.skill.skillName}</Text>
                        <Text>Niveau : {props.course.skillLevel}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
  });
export default CourseCard;