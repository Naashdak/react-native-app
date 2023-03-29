import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import { Course } from '../../domain/model/Course';
import { RootStackParamList } from '../RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>
type ProfileScreenNavigationProp = Props['navigation'];

const CourseCard = (course: Course, navigation: ProfileScreenNavigationProp) => {
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
        <View key={course.id.toString()} style={styles.container}>
            <TouchableNativeFeedback
                    onPress={() =>
                        navigation.push('Details', {
                        course: course
                        })
                    }>
                <View>
                    <Image
                        style={styles.image}
                        source={{uri: course.imageSrc.toString()}}
                    />
                    <View style={styles.informations}>
                        <Text>{course.title}</Text>
                        <Text>Description : {course.description}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
        
    )
}
export default CourseCard;