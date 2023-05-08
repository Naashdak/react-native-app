import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigatorParamList } from './StackNavigatorParamList';
import DetailsScreen from '../../details_feature/presentation/DetailsScreen';
import { LoginScreen } from '../../login_feature/presentation/LoginScreen';
import { CoursesScreen } from '../../courses_feature/presentation/CoursesScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const HomeStack = createNativeStackNavigator<StackNavigatorParamList>();

const StackNavigator = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Courses" 
          component={CoursesScreen} 
          options={{
            title : "Près de chez moi"
          }}
          
        />
        <HomeStack.Screen 
          name="Details" 
          component={DetailsScreen} 
          initialParams={{}} 
        />
        <HomeStack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            title: "Connexion"
          }}
        />
        {/* <HomeStack.Screen name="Account" component={} /> */}
      </HomeStack.Navigator>
    </GestureHandlerRootView>
  );
};

export default StackNavigator;