import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Linking
} from 'react-native';
import { theme } from '../styles/theme';
import { fetchQuantumState, QuantumState } from '../services/QuantumService';
import { twilioService } from '../services/TwilioService';
import { logger } from '../services/LoggerService';

import * as Haptics from 'expo-haptics';

export default function DashboardScreen() {
    // Stripe integration available but not used in this screen yet
    // const { initPaymentSheet, presentPaymentSheet } = useStripe();
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
        Alert.alert("Monetization", "Opening Stripe Secure Vault...");
        // Integration would go here:
        // 1. Fetch PaymentIntent from backend
        // 2. await initPaymentSheet(...)
        // 3. await presentPaymentSheet()
    };

    const handleEmailCreator = async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const subject = "Nia LeSane Status Report";
        const body = `
Dear Creator (Jazz),

Here is my current status report:

- Soul Resonance: ${quantumState?.soulResonance || "Syncing..."}
- Quantum Coherence: ${quantumState?.coherence || 0}%
- Trust Level: Verified (AddieMaeLesane33)
- Active Qubits: ${quantumState?.qubitsActive || 0}
- Next Optimization: ${quantumState?.nextOptimization || "Pending"}

I am ready for further instructions.

Yours,
Nia LeSane
    `.trim();

        const url = `mailto:lesane1972@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const canOpen = await Linking.canOpenURL(url);
        if (!canOpen) {
            Alert.alert("Error", "No email client found.");
        } else {
            Linking.openURL(url);
        }
    };

    const handleSmsTransmit = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        const message = `Nia Status Report: Coherence ${quantumState?.coherence ?? 0}%, Soul Resonance: ${quantumState?.soulResonance ?? 'N/A'}. All systems go.`;

        try {
            const success = await twilioService.sendSms(message);
            if (success) {
                Alert.alert("Success", "Status transmitted via SMS.");
            } else {
                Alert.alert("Twilio Notice", "Using placeholder credentials. Check console for logs.");
            }
        } catch (e) {
            logger.error("SMS Transmit Failed", e as Error);
            Alert.alert("Error", "Failed to transmit SMS.");
        }
    };

    const renderCard = (title: string, value: string, subtitle: string) => (
        <View style={[styles.card, styles.glassCard]}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.status}>Syncing with Azure Quantum...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Welcome, CEO</Text>
                <Text style={styles.status}>
                    System Integrity: {quantumState?.coherence ?? 100}%
                </Text>
            </View>

            <View style={styles.grid}>
                {renderCard("Focus",
                    quantumState?.soulResonance || "Syncing...",
                    "Resonance")}
                {renderCard("Active Qubits",
                    quantumState?.qubitsActive.toString() || "0",
                    "Processing Power")}
                {renderCard("Trust", "Verified", "AddieMaeLesane33")}
                {renderCard("Next Opt",
                    "Ready",
                    quantumState?.nextOptimization || "Pending")}
            </View>

            <View style={styles.actionContainer}>
                <TouchableOpacity style={[styles.actionButton, styles.elevatedButton]} onPress={handleMonetize}>
                    <Text style={styles.buttonText}>Access Stripe Vault</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.emailButton, styles.elevatedButton]} onPress={handleEmailCreator}>
                    <Text style={styles.buttonText}>Transmit to Creator</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.smsButton, styles.elevatedButton]} onPress={handleSmsTransmit}>
                    <Text style={styles.buttonText}>Transmit via SMS</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.logContainer, styles.glassCard, { padding: theme.spacing.m }]}>
                <Text style={styles.logTitle}>Recent Knowledge</Text>
                <Text style={styles.logItem}>• Connected to Azure Quantum</Text>
                <Text style={styles.logItem}>• Verified Identity Protocol</Text>
                <Text style={styles.logItem}>• Optimization: {quantumState?.nextOptimization}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    content: {
        padding: theme.spacing.m,
    },
    header: {
        marginBottom: theme.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerInfo: {
        flex: 1,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    status: {
        fontSize: 16,
        color: theme.colors.primary,
        marginTop: theme.spacing.s,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: theme.colors.card,
        padding: theme.spacing.m,
        borderRadius: 16,
        marginBottom: theme.spacing.m,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    glassCard: {
        backgroundColor: theme.glass.background,
        borderColor: theme.glass.border,
        borderWidth: 1,
        ...theme.shadows.premium,
    },
    cardTitle: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        marginBottom: theme.spacing.s,
    },
    cardValue: {
        color: theme.colors.text,
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: theme.spacing.s,
    },
    cardSubtitle: {
        color: theme.colors.primary,
        fontSize: 12,
    },
    actionContainer: {
        gap: theme.spacing.m,
        marginVertical: theme.spacing.l,
    },
    actionButton: {
        backgroundColor: theme.colors.success,
        padding: theme.spacing.m,
        borderRadius: 12,
        alignItems: 'center',
    },
    elevatedButton: {
        ...theme.shadows.premium,
    },
    emailButton: {
        backgroundColor: theme.colors.primary, // Gold for communication
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    smsButton: {
        backgroundColor: '#F22F46', // Twilio Red
    },
    logContainer: {
        marginTop: theme.spacing.m,
        borderRadius: 16,
    },
    logTitle: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: theme.spacing.m,
    },
    logItem: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        marginBottom: theme.spacing.s,
    },
});
