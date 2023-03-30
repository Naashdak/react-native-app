import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigatorParamList } from './StackNavigatorParamList';
import DetailsScreen from '../../details_feature/presentation/DetailsScreen';
import HomeScreen from '../presentation/HomeScreen';
import { LoginScreen } from '../../login_feature/presentation/LoginScreen';

const HomeStack = createNativeStackNavigator<StackNavigatorParamList>();

const StackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} initialParams={{}} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      {/* <HomeStack.Screen name="Account" component={} /> */}
    </HomeStack.Navigator>
  );
};

export default StackNavigator;