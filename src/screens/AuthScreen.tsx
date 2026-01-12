import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { theme } from '../styles/theme';
import { SECRETS } from '../config/secrets';
import { useOidcAuth } from '../services/AuthService';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import { StackNavigationProp } from '@react-navigation/stack';

type AuthScreenNavigationProp = StackNavigationProp<any, 'Auth'>;

import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';

const { width } = Dimensions.get('window');

export default function AuthScreen({ navigation }: { navigation: AuthScreenNavigationProp }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { request, response, promptAsync } = useOidcAuth();

    // Animation values
    const logoScale = useSharedValue(0.8);
    const containerOpacity = useSharedValue(0);
    const inputFocus = useSharedValue(0);

    useEffect(() => {
        logoScale.value = withSpring(1, { damping: 12 });
        containerOpacity.value = withTiming(1, { duration: 1200 });
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
            Alert.alert("Soulful Identity Verified", "Welcome, Corporate Commander.");
            navigation.replace('Dashboard');
        }
    }, [response]);

    const handleVerify = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if (password === SECRETS.SPECIAL_PASSWORD) {
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
            opacity: containerOpacity.value,
        };
    });

    const animatedCardStyle = useAnimatedStyle(() => {
        return {
            opacity: containerOpacity.value,
            transform: [
                { translateY: interpolate(containerOpacity.value, [0, 1], [40, 0]) }
            ],
        };
    });

    const animatedInputStyle = useAnimatedStyle(() => {
        return {
            borderColor: interpolate(inputFocus.value, [0, 1], [theme.glass.border as any, theme.colors.primary as any]) as any,
            backgroundColor: interpolate(inputFocus.value, [0, 1], [theme.glass.background as any, theme.glass.activeBackground as any]) as any,
        };
    });

    return (
        <ImageBackground
            source={require('../../assets/quantum_jazz_bg.png')}
            style={styles.container}
            blurRadius={1}
        >
            <View style={styles.overlay}>
                <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                    <Text style={styles.logoText}>NIA</Text>
                    <Text style={styles.subLogoText}>LESANE • FOUNDATION</Text>
                    <View style={styles.goldDivider} />
                </Animated.View>

                <Animated.View style={[styles.card, styles.glassCard, animatedCardStyle]}>
                    <Text style={styles.label}>Identify Your Soul Resonance</Text>

                    <Animated.View style={[styles.inputWrapper, animatedInputStyle]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Speak the sacred words"
                            placeholderTextColor="#A090B0"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => inputFocus.value = withTiming(1)}
                            onBlur={() => inputFocus.value = withTiming(0)}
                            autoCapitalize="none"
                        />
                    </Animated.View>

                    <TouchableOpacity
                        style={[styles.primaryButton, styles.elevatedButton]}
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#0F011A" />
                        ) : (
                            <Text style={styles.buttonText}>Verify Authority</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.secondaryActions}>
                        <TouchableOpacity
                            style={[styles.outlineButton, { flex: 1, marginRight: 8 }]}
                            onPress={handleBiometricAuth}
                        >
                            <Text style={styles.outlineButtonText}>Biometrics</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.outlineButton, { flex: 1, marginLeft: 8 }]}
                            onPress={handleCorporateLogin}
                            disabled={!request}
                        >
                            <Text style={styles.outlineButtonText}>SSO Link</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>HOUSE OF JAZZU • SECURE PROTOCOL</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 1, 26, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    logoText: {
        fontSize: 72,
        fontWeight: '900',
        color: theme.colors.primary,
        letterSpacing: 12,
        ...theme.shadows.glow,
    },
    subLogoText: {
        fontSize: 14,
        color: theme.colors.secondary,
        letterSpacing: 4,
        marginTop: 4,
        fontWeight: '600',
    },
    goldDivider: {
        width: 40,
        height: 2,
        backgroundColor: theme.colors.primary,
        marginTop: 16,
        borderRadius: 1,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        padding: theme.spacing.xl,
        borderRadius: 24,
    },
    glassCard: {
        backgroundColor: theme.glass.background,
        borderColor: theme.glass.border,
        borderWidth: 1.5,
        ...theme.shadows.premium,
    },
    label: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    inputWrapper: {
        height: 56,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 24,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        color: '#FFFFFF',
        fontSize: 16,
        height: '100%',
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    elevatedButton: {
        ...theme.shadows.glow,
    },
    buttonText: {
        color: '#0F011A',
        fontSize: 16,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    secondaryActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    outlineButton: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    outlineButtonText: {
        color: theme.colors.primary,
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 10,
        letterSpacing: 3,
        fontWeight: 'bold',
    },
});
