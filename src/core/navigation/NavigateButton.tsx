import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native/types";
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from "./RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "Login">

function NavigateButton(
    {navigation, route}: Props, 
    iconVectorName: React.ComponentProps<typeof MaterialIcons>['name']
){
    return(
        <TouchableOpacity
            onPress={() => {navigation.navigate(route.name, route.params)}}
        >
            <MaterialIcons name={iconVectorName} size={24} color="black" />
        </TouchableOpacity>
    )
}

export default NavigateButton;