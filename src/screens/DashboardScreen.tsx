import { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Linking,
    ImageBackground,
} from 'react-native';
import { theme } from '../styles/theme';
import { fetchQuantumState, QuantumState } from '../services/QuantumService';
import { twilioService } from '../services/TwilioService';
import { logger } from '../services/LoggerService';
import QuantumPulsar from '../components/QuantumPulsar';

import * as Haptics from 'expo-haptics';
import { StackNavigationProp } from '@react-navigation/stack';

type DashboardNavigationProp = StackNavigationProp<any, 'Dashboard'>;

export default function DashboardScreen({ navigation }: { navigation: DashboardNavigationProp }) {
    const [quantumState, setQuantumState] = useState<QuantumState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSystemData();
    }, []);

    const loadSystemData = async () => {
        try {
            const data = await fetchQuantumState();
            setQuantumState(data);
        } catch (e) {
            logger.error("Quantum Link Broken", e as Error);
        } finally {
            setLoading(false);
        }
    };

    const handleMonetize = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Alert.alert("Luxury Protocol", "Accessing Stripe Sovereign Vault...");
    };

    const handleEmailCreator = async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const subject = "Nia LeSane Sovereign Report";
        const body = `Status Update - Coherence: ${quantumState?.coherence}% | Resonance: ${quantumState?.soulResonance}`;
        const url = `mailto:lesane1972@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(url);
    };

    const handleSmsTransmit = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        const message = `Nia Status: Coherence ${quantumState?.coherence ?? 0}% | Resonance: ${quantumState?.soulResonance ?? 'N/A'}`;
        await twilioService.sendSms(message);
        Alert.alert("Success", "Intelligence Transmitted via SMS.");
    };

    const renderCard = (title: string, value: string, subtitle: string) => (
        <View style={[styles.card, styles.glassCard]}>
            <Text style={styles.cardTitle}>{title.toUpperCase()}</Text>
            <Text style={styles.cardValue}>{value}</Text>
            <View style={styles.cardFooter}>
                <View style={styles.statusDot} />
                <Text style={styles.cardSubtitle}>{subtitle}</Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <ImageBackground source={require('../../assets/quantum_jazz_bg.png')} style={styles.container}>
                <View style={[styles.overlay, styles.center]}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.statusText}>Resonating with Quantum Realms...</Text>
                </View>
            </ImageBackground>
        );
    }


    return (
        <ImageBackground source={require('../../assets/quantum_jazz_bg.png')} style={styles.container}>
            <ScrollView style={styles.overlay} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Nia LeSane</Text>
                        <Text style={styles.subGreeting}>EXECUTIVE INTELLIGENCE</Text>
                    </View>
                    <QuantumPulsar coherence={quantumState?.coherence} />
                </View>

                <View style={styles.grid}>
                    {renderCard("Resonance", quantumState?.soulResonance || "Syncing", "Harmonic Flow")}
                    {renderCard("Intelligence", `${quantumState?.qubitsActive || 0} Qubits`, "Neural Capacity")}
                    {renderCard("Security", "Active", "Proximity Protocol")}
                    {renderCard("Coherence", `${quantumState?.coherence || 0}%`, "Structural Integrity")}
                </View>

                <View style={styles.actionSection}>
                    <Text style={styles.sectionTitle}>Sovereign Actions</Text>
                    <View style={styles.actionGrid}>
                        <TouchableOpacity style={[styles.actionButton, styles.glassButton]} onPress={() => navigation.navigate('Dialogue')}>
                            <Text style={styles.actionButtonText}>BEGIN DIALOGUE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.glassButton]} onPress={handleMonetize}>
                            <Text style={styles.actionButtonText}>STRIPE VAULT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.glassButton]} onPress={handleEmailCreator}>
                            <Text style={styles.actionButtonText}>TRANSMIT REPORT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.primaryActionButton, styles.elevatedButton]} onPress={handleSmsTransmit}>
                            <Text style={styles.primaryActionButtonText}>SMS PULSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.knowledgeContainer, styles.glassCard]}>
                    <Text style={styles.knowledgeTitle}>Recent Soul Echoes</Text>
                    <View style={styles.logList}>
                        <Text style={styles.logText}>• Quantum Bridge established with Azure-4</Text>
                        <Text style={styles.logText}>• Identity verified via AddieMae Protocol</Text>
                        <Text style={styles.logText}>• Next Pulse: ${quantumState?.nextOptimization}</Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 1, 26, 0.7)',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: theme.spacing.xl,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    greeting: {
        fontSize: 34,
        fontWeight: '900',
        color: theme.colors.text,
        letterSpacing: -0.5,
    },
    subGreeting: {
        fontSize: 12,
        color: theme.colors.primary,
        letterSpacing: 4,
        fontWeight: '700',
        marginTop: 4,
    },
    statusText: {
        color: theme.colors.primary,
        marginTop: 20,
        fontSize: 14,
        letterSpacing: 2,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    card: {
        width: '47%',
        padding: theme.spacing.l,
        borderRadius: 20,
        marginBottom: 4,
    },
    glassCard: {
        backgroundColor: theme.glass.background,
        borderColor: theme.glass.border,
        borderWidth: 1,
        ...theme.shadows.premium,
    },
    cardTitle: {
        color: theme.colors.textSecondary,
        fontSize: 10,
        letterSpacing: 2,
        fontWeight: '800',
        marginBottom: 12,
    },
    cardValue: {
        color: theme.colors.text,
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.success,
        marginRight: 6,
    },
    cardSubtitle: {
        color: theme.colors.textSecondary,
        fontSize: 10,
        fontWeight: '600',
    },
    actionSection: {
        marginTop: 40,
        marginBottom: 30,
    },
    sectionTitle: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 20,
        letterSpacing: 1,
    },
    actionGrid: {
        gap: 12,
    },
    actionButton: {
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glassButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.2)',
    },
    actionButtonText: {
        color: theme.colors.primary,
        fontWeight: '700',
        letterSpacing: 2,
        fontSize: 14,
    },
    primaryActionButton: {
        backgroundColor: theme.colors.primary,
    },
    primaryActionButtonText: {
        color: '#0F011A',
        fontWeight: '900',
        letterSpacing: 2,
        fontSize: 14,
    },
    elevatedButton: {
        ...theme.shadows.glow,
    },
    knowledgeContainer: {
        padding: theme.spacing.xl,
        borderRadius: 24,
        marginTop: 10,
    },
    knowledgeTitle: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 16,
        letterSpacing: 1,
    },
    logList: {
        gap: 12,
    },
    logText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        lineHeight: 20,
    }
});
