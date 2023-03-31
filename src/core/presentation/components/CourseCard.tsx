import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import { UserSkill } from '../../domain/model/UserSkill';
import { UserWithSkillsDTO } from '../../domain/model/UserWithSkillsDTO';

type Props = {
    user: UserWithSkillsDTO
    userSkill: UserSkill
    navigateToDetailsScreen(user:UserWithSkillsDTO, userSkill: UserSkill):void;
}

const CourseCard: FunctionComponent<Props> = (props) => {
    const styles = StyleSheet.create({
        container: {
            margin:10,
            flex: 1,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        },

        image: {
            width: 64,
            height: 32
        },

        informations: {
            flex: 1,
            flexDirection: 'column'
        }
    })
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback
                    onPress={() =>
                        props.navigateToDetailsScreen(props.user, props.userSkill)
                    }>
                <View>
                    {/* <Image
                        style={styles.image}
                        source={{uri: props.user.imageSrc.toString()}}
                    /> */}
                    <View style={styles.informations}>
                        <Text>Pseudo : {props.user.username}</Text>
                        <Text>Ville : {props.user.city.cityName} {props.user.city.zipCode}</Text>
                        <Text>Compétence : {props.userSkill.skill.skillName}</Text>
                        <Text>Niveau : {props.userSkill.skillLevel}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
export default CourseCard;