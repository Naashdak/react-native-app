import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {Text, View} from 'react-native'
import { StackNavigatorParamList } from "../../core/navigation/StackNavigatorParamList";

type Props = NativeStackScreenProps<StackNavigatorParamList, 'Login'>

export function LoginScreen({navigation, route}: Props){
    return(
        <View style={{justifyContent: 'center', height: '100%'}}>
            <Text style={{textAlign: 'center'}}>Login Screen</Text>
        </View>
    )
}