import React, { useEffect } from "react"
import { Dimensions, StyleSheet, View, Text} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

const BottomSheet = () => {
    const translateY = useSharedValue(0)

    const context = useSharedValue({y: 0})
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = {y: translateY.value}
        }) 
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        })

    useEffect(() => {
        translateY.value = withSpring(-SCREEN_HEIGHT / 3, {damping: 50})
    }, [])

    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value, 
            [MAX_TRANSLATE_Y +50, MAX_TRANSLATE_Y], 
            [25, 5],
            Extrapolate.CLAMP
        )
        return{
            borderRadius,
            transform: [{ translateY: translateY.value}]
        }
    })

    return(
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line} />
            </Animated.View>
        </GestureDetector>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'red',
        position: 'absolute',
        top: SCREEN_HEIGHT / 1.5,
        borderRadius: 25,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    },
})