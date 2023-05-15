import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import { UserSkillsWithUserAndCityDTO } from '../../domain/model/UserSkillsWithUserAndCityDTO';
import FontAwesome from '@expo/vector-icons/FontAwesome'

type Props = {
    course: UserSkillsWithUserAndCityDTO
    navigateToDetailsScreen(courses:UserSkillsWithUserAndCityDTO):void;
}

const CourseCard: FunctionComponent<Props> = (props) => {
    return (
        <TouchableNativeFeedback
            onPress={() =>
            props.navigateToDetailsScreen(props.course)}
        >
            <View style={styles.card}>
                <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                {props.course.user.picture ? 
                    <Image style={styles.iconContainer} source={{ uri: process.env.API_BASE + "/" + props.course.user.picture.url}}/>
                    : 
                    <View style={styles.iconContainer}>
                        <FontAwesome name="user" size={50} color={"#0f172a"} />
                    </View>
                }
                    <Text>{props.course.user?.username}</Text>

                </View>
                <View style={{justifyContent: "center", alignItems: "flex-start", width: "55%"}}>
                    <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                        <FontAwesome name="map-marker" size={16} color={"#0f172a"} accessibilityLabel='ville' />
                        <Text>{props.course.user?.city.cityName}</Text>
                    </View>
                    <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                        <FontAwesome name="book" size={16} color={"#0f172a"} accessibilityLabel='compétence' />
                        <Text>{props.course.skill.skillName}</Text>
                    </View>
                    <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                        <FontAwesome name="star" size={16} color={"#0f172a"} accessibilityLabel='niveau' />
                        <Text>{props.course.skillLevel}</Text>
                    </View>
                </View>
                
            </View>
        </TouchableNativeFeedback>

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
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 35,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
      },
  });
export default CourseCard;