import { FunctionComponent } from "react"
import { ActivityIndicator, View, StyleSheet, Modal } from "react-native";

type Props = {
    isLoading: boolean
}

const Loader: FunctionComponent<Props> = (props) => {
    return(
        <View style={styles.centeredView}>
            <Modal
            animationType="fade"
            transparent={true}
            visible={props.isLoading}>
                <View style={styles.centeredView}>
                    <ActivityIndicator animating={props.isLoading} size={"large"}/>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    }
})

export default Loader;