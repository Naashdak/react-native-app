import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigatorParamList } from './StackNavigatorParamList';
import DetailsScreen from '../../details_feature/presentation/DetailsScreen';
import { LoginScreen } from '../../login_feature/presentation/LoginScreen';
import { CoursesScreen } from '../../courses_feature/presentation/CoursesScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Image, StatusBar } from 'react-native';

const HomeStack = createNativeStackNavigator<StackNavigatorParamList>();

const StackNavigator = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <StatusBar 
        backgroundColor={"#0F172A"} />
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Courses" 
          component={CoursesScreen} 
          options={{
            title : "Près de chez moi",
            headerStyle: {
              backgroundColor: "#0F172A"
            },
            headerTintColor: "white",
            headerRight: () => <Image style={{width: 50, height: 50}} source={require('./../../../assets/icon.png')} />
          }}
        />
        <HomeStack.Screen 
          name="Details" 
          component={DetailsScreen} 
          initialParams={{}} 
          options={
            ({route}) => ({
              title: "",
              headerTransparent: true,
              headerTintColor: "white"
            })
          }
        />
        <HomeStack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            title: "Connexion"
          }}
        />
      </HomeStack.Navigator>
    </GestureHandlerRootView>
  );
};

export default StackNavigator;