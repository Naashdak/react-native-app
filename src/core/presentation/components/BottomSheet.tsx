import React, { useCallback, useImperativeHandle, useState } from "react"
import { Dimensions, StyleSheet, View, Text} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import RadioButton, { RadioButtonItem } from "./RadioButton"

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 704

type BottomSheetProps = {
    setSortByOption: (value: number) => void
}

export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void
    isActive: () => boolean
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>((props, ref) => {
    const translateY = useSharedValue(230)
    const active = useSharedValue(false)

    const scrollTo = useCallback((desitnation: number) => {
        'worklet';
        active.value = desitnation !== 230
        translateY.value = withSpring(desitnation,{damping: 50})
    }, [])

    const isActive = useCallback(() => {
        return active.value
    }, [])

    useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive])

    const context = useSharedValue({y: 230})
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = {y: translateY.value}
        }) 
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
        })
        .onEnd(() => {
            if(translateY.value > -SCREEN_HEIGHT/2.5){
                scrollTo(230)
            }
        })

    const rBottomSheetStyle = useAnimatedStyle(() => {
        // const borderRadius = interpolate(
        //     translateY.value, 
        //     [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y], 
        //     [25, 5],
        //     Extrapolate.CLAMP
        // )
        return{
            transform: [{ translateY: translateY.value,}],
            borderRadius: 25
        }
    })

    const rBackdropStyle = useAnimatedStyle(() => {
        return{
            opacity: withTiming(active.value? 1 : 0),
        }
    }, [])

    const rBackdropProps = useAnimatedProps(() => {
        return{
            pointerEvents: active.value ? 'auto' : 'none'
        } as any
    }, [])

    const [option, setOption] = useState(0)

    const sortByItems = [
        {label: "Ville", value: 0},
        {label: "Utilisateur", value: 1},
        {label: "Compétence", value: 2}
    ]

    return(
        <>
        <Animated.View 
            onTouchStart={() => {
                scrollTo(230)
            }}
            animatedProps={rBackdropProps}
            style={[
                {
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.4)'
                },
                rBackdropStyle
            ]}
        />
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line} />
                <View style={styles.filterContainer}>
                    <RadioButton 
                        data={sortByItems} 
                        onSelect={(item: RadioButtonItem) =>{ 
                            setOption(item.value)
                            props.setSortByOption(item.value)
                        }} />
                </View>
            </Animated.View>
        </GestureDetector>
        </>

    )
})

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
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
    filterContainer: {

    },
    radioFormContainer: {
        gap: 20
    },
    radioButton: {
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    radioButtonLabel: {
        fontSize: 18
    },
    radioFormTitle: {
        color: 'grey',
        paddingHorizontal: 18,
        fontSize: 18,
        marginBottom: 20
    }
})