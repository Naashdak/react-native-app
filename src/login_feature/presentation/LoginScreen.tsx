import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../core/presentation/RootStackParamList";
import {Text, View} from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export function LoginScreen({navigation}: Props){
    return(
        <View style={{justifyContent: 'center'}}>
            <Text>Login Screen</Text>
        </View>
    )
}