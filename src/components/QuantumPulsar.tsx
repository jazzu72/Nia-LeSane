import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing
} from 'react-native-reanimated';
import { theme } from '../styles/theme';

interface QuantumPulsarProps {
    coherence?: number;
}

export default function QuantumPulsar({ coherence = 100 }: QuantumPulsarProps) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.5);

    useEffect(() => {
        const duration = 2000 - (coherence * 10); // Faster pulse for higher coherence

        scale.value = withRepeat(
            withSequence(
                withTiming(1.5, { duration: duration / 2, easing: Easing.out(Easing.exp) }),
                withTiming(1, { duration: duration / 2, easing: Easing.in(Easing.exp) })
            ),
            -1,
            true
        );

        opacity.value = withRepeat(
            withSequence(
                withTiming(0.8, { duration: duration / 2 }),
                withTiming(0.2, { duration: duration / 2 })
            ),
            -1,
            true
        );
    }, [coherence]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    const innerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value + 0.2,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.pulse, animatedStyle]} />
            <Animated.View style={[styles.core, innerAnimatedStyle]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulse: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primary,
        position: 'absolute',
    },
    core: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        ...theme.shadows.glow,
    },
});
