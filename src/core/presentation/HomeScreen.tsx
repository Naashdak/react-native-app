import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {Text, View} from 'react-native'
import { RootStackParamList } from "./RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export function HomeScreen({navigation}: Props){
    return(
        <View style={{justifyContent: 'center'}}>
            <Text>Home Screen</Text>
        </View>
    )
}