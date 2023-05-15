import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export type RadioButtonItem = {
    label: string,
    value: number
}

type Props = {
    data: RadioButtonItem[],
    onSelect(item: RadioButtonItem): void
}
const RadioButton = ({data, onSelect}: Props) => {
    const [userOption, setUserOption] = useState(0)
    const selectHandler = (item: RadioButtonItem) => {
        onSelect(item)
        setUserOption(item.value)
    }
    return(
        <View style={styles.list}>
            <Text style={styles.title}>TRIER PAR</Text>
            {data.map((item, index) => {
        return (
            <View style={styles.radioButtonContainer} key={index}>
                <TouchableOpacity
                    onPress={() => selectHandler(item)}
                    style={styles.radioButton}>
                        <Text style={styles.radioButtonText}>{item.label}</Text>
                        <View style={styles.radioContainer}>
                            <View style={[styles.radioButtonIcon, userOption === item.value ? styles.selected : null]} />

                        </View>
                </TouchableOpacity>
            </View>
        );
      })}
        </View>
    )
}

const styles = StyleSheet.create({
    selected: {
        backgroundColor: "#16A34A"
    },
    radioButtonContainer: {
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        marginHorizontal: 20,
        paddingHorizontal: 10,
    },
    radioButtonIcon: {
        height: 20,
        width: 20,
        borderRadius: 20,
        borderColor: "red",
        alignSelf: "center",
    },
    radioButtonText: {
        fontSize: 18,
        fontWeight: "600"
    },
    list: {
        gap: 20
    },
    title: {
        color: 'grey',
        paddingHorizontal: 25,
        fontSize: 18
    },
    radioContainer: {
        borderRadius: 25,
        height: 30,
        width: 30,
        justifyContent: 'center',
        borderColor: "grey",
        borderWidth: 1
    }
})

export default RadioButton