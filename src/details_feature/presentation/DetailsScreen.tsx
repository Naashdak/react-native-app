import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, Image } from "react-native";
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";
import { UserSkillsWithUserAndCityDTO } from "../../courses_feature/domain/model/UserSkillsWithUserAndCityDTO";
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { AirbnbRating } from 'react-native-ratings';

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Details'>
const {height: SCREEN_HEIGHT} = Dimensions.get('window')

function DetailsScreen({route, navigation}: Props) {
  const course: UserSkillsWithUserAndCityDTO = route.params.course;
  const rating = (label: string) => {
    switch(label){
      case "Débutant":
        return 1

      case "Intermédiaire":
        return 2

      case "Expérimenté":
        return 3

      case "Expert":
        return 4
    }
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', 'transparent']}
        style={styles.background}
      />
      <View style={styles.courseDetails}>
        <View style={styles.header}>
          <View style={styles.informations}>
            <Text style={styles.headerText}>{course.skill.skillName}</Text>
            <Text style={styles.headerText}>{course.skillLevel}</Text>
          </View>
          <View style={{alignItems: "center", maxWidth: "33%"}}>
            {course.user.picture ? 
              <Image style={styles.iconContainer} source={{ uri: process.env.API_BASE + "/" + course.user.picture.url}}/>
              : 
              <View style={styles.iconContainer}>
                <FontAwesome name="user" size={50} color={"#0f172a"} />
              </View>
            }
              
            <Text style={{fontSize: 20, color: "white"}}>{course.user.username}</Text>
          </View>
        </View>
        <View>
          <AirbnbRating 
            ratingContainerStyle={{alignSelf: 'flex-start', marginTop: 10}}
            size={20} 
            defaultRating={rating(course.skillLevel)}
            count={4}
            isDisabled
            showRating={false}/>
        </View>
      </View>
      
      <View style={styles.bottom}>
        <View style={styles.content}>
          <View style={styles.description}>
              <Text style={styles.contentTextTitle}>Description</Text>
              <Text style={styles.contentText}>{course.personnalNote}</Text>
          </View>
          <TouchableHighlight
              style={styles.buttonClickContainer}
              onPress={() => {}}>
                  <View style={styles.buttonContainer}>
                      <FontAwesome name="send" size={20} color={"white"} />
                      <Text style={styles.buttonText}>Contacter</Text>
                  </View>
            </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container : {
    backgroundColor: 'white',
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT,
  },
  courseDetails: {
    marginTop: "20%",
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  informations: {
    paddingStart: 3,
    width: "60%"
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 35,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
  },
  content: {
    margin: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80%'
  },
  description: {
    
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  contentTextTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  contentText: {
    fontSize: 16,
  },
  buttonClickContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#16A34A',
    borderRadius: 5,
    padding: 10,
    margin: 15,
    width: 150,
    alignSelf: 'center'
},
buttonContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    height: 30,
    alignItems: 'center'
},
buttonIcon: {

},
buttonText: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 10,
    marginTop: 2,
},
  bottom: {
    position: "absolute",
    bottom: 0,
    height: SCREEN_HEIGHT / 1.6,
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    zIndex: 1,
  }
})