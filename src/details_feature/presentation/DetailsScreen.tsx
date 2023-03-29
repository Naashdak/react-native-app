import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../core/presentation/RootStackParamList";
import {Text, View} from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>

export function DetailsScreen({navigation}: Props){
    return(
        <View style={{justifyContent: 'center'}}>
            <Text>Details Screen</Text>
        </View>
    )
}