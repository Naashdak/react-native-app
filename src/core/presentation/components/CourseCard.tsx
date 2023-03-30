import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import { Course } from '../../domain/model/Course';

type Props = {
    course: Course
    navigateToDetailsScreen(course:Course):void;
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
                        props.navigateToDetailsScreen(props.course)
                    }>
                <View>
                    <Image
                        style={styles.image}
                        source={{uri: props.course.imageSrc.toString()}}
                    />
                    <View style={styles.informations}>
                        <Text>{props.course.title}</Text>
                        <Text>Description : {props.course.description}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}
export default CourseCard;