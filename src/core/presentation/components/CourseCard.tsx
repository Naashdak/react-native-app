import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import { Course } from '../../domain/model/Course';
import { User } from '../../domain/model/User';

type Props = {
    user: User
    navigateToDetailsScreen(user:User):void;
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
                        props.navigateToDetailsScreen(props.user)
                    }>
                <View>
                    {/* <Image
                        style={styles.image}
                        source={{uri: props.user.imageSrc.toString()}}
                    /> */}
                    <View style={styles.informations}>
                        <Text>{props.user.username}</Text>
                        <Text>Description : {props.user.userSkills[0].personnalNote}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
export default CourseCard;