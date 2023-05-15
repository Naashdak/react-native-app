import React, { useCallback, useImperativeHandle } from "react"
import { Dimensions, StyleSheet, View} from 'react-native'
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import Filters from "./Filters"
import { Skill } from "../../../core/domain/model/Skill"
import { CategoriesWithSkillDTO } from "../../../core/domain/model/CategoriesWithSkillsDTO"


const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 390

export type FilterBottomSheetProps = {
    scrollTo: (destination: number) => void
    isActive: () => boolean
}
type Props = {
    categories: CategoriesWithSkillDTO[],
    // setFilteringOptions:(value: number[]) => void
    handleCategorySelection:(value: number) => void
    handleSkillSelection:(skill: Skill) => void
    selectedCategories: number[]
    selectedSkills: Skill[],
    selectableSkills: Skill[]
}

const FilterBottomSheet = React.forwardRef<FilterBottomSheetProps, Props>((props, ref) => {
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
            if(translateY.value > -SCREEN_HEIGHT/2.2){
                scrollTo(230)
            }
        })

    const rBottomSheetStyle = useAnimatedStyle(() => {
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
                    <ScrollView style={{height: SCREEN_HEIGHT/ 1.2}}>
                        <Filters 
                            data={props.categories} 
                            onCategorySelection={props.handleCategorySelection} 
                            onSkillSelection={props.handleSkillSelection} 
                            selectedCategories={props.selectedCategories}
                            selectedSkills={props.selectedSkills}
                            selectableSkills={props.selectableSkills}/>
                    </ScrollView>
                    
                </View>
            </Animated.View>
        </GestureDetector>
        </>

    )
})

export default FilterBottomSheet

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
    },
    filterContainer: {
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 60
    },
    filterTitle: {
        fontSize: 20,
        color: 'grey',
    },
    divider: {
        height: 1,
        backgroundColor: 'grey',
        opacity: 0.2
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})