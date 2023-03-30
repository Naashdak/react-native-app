import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { LoginScreen } from "../../login_feature/presentation/LoginScreen";
import { RootStackParamList } from "./RootStackParamList";
import { MaterialIcons } from '@expo/vector-icons';
import DetailsScreen from "../../details_feature/presentation/DetailsScreen";
import { HomeScreen } from "../presentation/HomeScreen";
import NavigateButton from "./NavigateButton";

export function Navigation(){
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const navigation = useNavigation();
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerRight: () => (
                    NavigateButton({navigation}, "account-circle")
                )
            }}>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    />
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => {alert("home")}}>
                                <MaterialIcons name="home" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    }}
                />
                <Stack.Screen 
                    name="Details" 
                    component={DetailsScreen} 
                    initialParams={{}} 
                    options={({route}) => ({title:route.params.course.title})}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}