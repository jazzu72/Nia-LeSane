import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';
import { theme } from '../styles/theme';
import { SECRETS } from '../config/secrets';
import { useOidcAuth } from '../services/AuthService';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming
} from 'react-native-reanimated';

import { StackNavigationProp } from '@react-navigation/stack';

type AuthScreenNavigationProp = StackNavigationProp<any, 'Auth'>;

import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';

export default function AuthScreen({ navigation }: { navigation: AuthScreenNavigationProp }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { request, response, promptAsync } = useOidcAuth();

    // Animation values
    const logoScale = useSharedValue(1);
    const inputOpacity = useSharedValue(0);

    useEffect(() => {
        // Entrance animation
        logoScale.value = withSequence(
            withTiming(1.2, { duration: 1000 }),
            withSpring(1)
        );
        inputOpacity.value = withTiming(1, { duration: 2000 });
        checkBiometrics();
    }, []);

    const checkBiometrics = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (hasHardware && isEnrolled) {
            // Auto-trigger biometrics if possible or show button
        }
    };

    const handleBiometricAuth = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Verify your Soul Resonance (Biometrics)',
            fallbackLabel: 'Use Password',
        });

        if (result.success) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.replace('Dashboard');
        }
    };

    useEffect(() => {
        if (response?.type === 'success') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            const { code } = response.params;
            // In a real app, exchange code for token here
            Alert.alert("Soulful Identity Verified", "Welcome, Corporate Commander.");
            navigation.replace('Dashboard');
        }
    }, [response]);

    const handleVerify = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setLoading(true);

        // Simulate "Thinking/Feeling" delay
        setTimeout(() => {
            setLoading(false);
            if (password === SECRETS.SPECIAL_PASSWORD) {
                // Success - Soulful transition
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                navigation.replace('Dashboard');
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert(
                    "Trust Verification Failed",
                    "I do not recognize your rhythm. Attempt to identify yourself correctly."
                );
            }
        }, 1500);
    };

    const handleCorporateLogin = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        promptAsync();
    };

    const animatedLogoStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: logoScale.value }],
        };
    });

    const animatedInputStyle = useAnimatedStyle(() => {
        return {
            opacity: inputOpacity.value,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                <Text style={styles.logoText}>NIA</Text>
                <Text style={styles.subLogoText}>House of Jazzu</Text>
            </Animated.View>

            <Animated.View style={[styles.inputContainer, animatedInputStyle]}>
                <Text style={styles.label}>Identify Yourself</Text>
                <View style={[styles.inputWrapper, styles.glassCard]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Speak the words..."
                        placeholderTextColor={theme.colors.textSecondary}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, styles.elevatedButton]}
                    onPress={handleVerify}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.colors.background} />
                    ) : (
                        <Text style={styles.buttonText}>Verify Trust</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.bioButton, styles.elevatedButton]}
                    onPress={handleBiometricAuth}
                >
                    <Text style={styles.buttonText}>Biometric Entry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.oidcButton, styles.elevatedButton]}
                    onPress={handleCorporateLogin}
                    disabled={!request}
                >
                    <Text style={[styles.buttonText, { color: '#FFF' }]}>Corporate Login</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.l,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: theme.colors.primary,
        letterSpacing: 8,
        ...theme.shadows.glow,
    },
    subLogoText: {
        fontSize: 18,
        color: theme.colors.secondary,
        letterSpacing: 2,
        marginTop: theme.spacing.s,
    },
    inputContainer: {
        width: '100%',
        maxWidth: 350,
    },
    label: {
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
        fontSize: 16,
        marginLeft: 4,
    },
    inputWrapper: {
        marginBottom: theme.spacing.l,
        borderRadius: 12,
        overflow: 'hidden',
    },
    glassCard: {
        backgroundColor: theme.glass.background,
        borderColor: theme.glass.border,
        borderWidth: 1,
        ...theme.shadows.premium,
    },
    input: {
        color: theme.colors.text,
        padding: theme.spacing.m,
        fontSize: 16,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.m,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    elevatedButton: {
        ...theme.shadows.premium,
    },
    bioButton: {
        backgroundColor: theme.colors.success,
    },
    oidcButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    buttonText: {
        color: theme.colors.background,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
