import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigatorParamList } from './StackNavigatorParamList';
import DetailsScreen from '../../details_feature/presentation/DetailsScreen';
import { LoginScreen } from '../../login_feature/presentation/LoginScreen';
import { CoursesScreen } from '../../courses_feature/presentation/CoursesScreen';

const HomeStack = createNativeStackNavigator<StackNavigatorParamList>();

const StackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Courses" component={CoursesScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} initialParams={{}} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      {/* <HomeStack.Screen name="Account" component={} /> */}
    </HomeStack.Navigator>
  );
};

export default StackNavigator;