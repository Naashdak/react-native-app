import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen } from "../../details_feature/presentation/DetailsScreen";
import { LoginScreen } from "../../login_feature/presentation/LoginScreen";
import { HomeScreen } from "./HomeScreen";
import { RootStackParamList } from "./RootStackParamList";

export function Navigation(){
    const Stack = createNativeStackNavigator<RootStackParamList>();
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
}