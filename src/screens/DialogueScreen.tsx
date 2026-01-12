import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import { theme } from '../styles/theme';
import { dialogueService, ChatMessage } from '../services/DialogueService';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, FadeInRight, FadeInLeft } from 'react-native-reanimated';

export default function DialogueScreen() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            text: "Welcome to Direct Resonance. I am Nia. How shall we synchronize today?",
            sender: 'nia',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        setIsTyping(true);
        const responseText = await dialogueService.getResponse(inputText);
        setIsTyping(false);

        const niaMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            sender: 'nia',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, niaMsg]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    const renderMessage = ({ item }: { item: ChatMessage }) => {
        const isNia = item.sender === 'nia';
        return (
            <Animated.View
                entering={isNia ? FadeInLeft : FadeInRight}
                style={[
                    styles.messageBubble,
                    isNia ? styles.niaBubble : styles.userBubble,
                    styles.glassBubble
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </Animated.View>
        );
    };

    return (
        <ImageBackground
            source={require('../../assets/quantum_jazz_bg.png')}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.overlay}
                keyboardVerticalOffset={90}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                />

                {isTyping && (
                    <View style={styles.typingIndicator}>
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                        <Text style={styles.typingText}>Nia is resonating...</Text>
                    </View>
                )}

                <View style={[styles.inputContainer, styles.glassInput]}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Speak to Nia..."
                        placeholderTextColor="#A090B0"
                        multiline
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}
                    >
                        <Text style={styles.sendButtonText}>SEND</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 1, 26, 0.6)',
    },
    listContent: {
        padding: theme.spacing.m,
        paddingBottom: 20,
    },
    messageBubble: {
        padding: 14,
        borderRadius: 18,
        marginBottom: 12,
        maxWidth: '85%',
    },
    glassBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    niaBubble: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
        borderColor: 'rgba(255, 215, 0, 0.2)',
    },
    userBubble: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    messageText: {
        color: '#FFFFFF',
        fontSize: 15,
        lineHeight: 22,
    },
    timestamp: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.4)',
        marginTop: 6,
        alignSelf: 'flex-end',
    },
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    typingText: {
        color: theme.colors.primary,
        fontSize: 12,
        marginLeft: 8,
        letterSpacing: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        margin: 16,
        borderRadius: 24,
    },
    glassInput: {
        backgroundColor: 'rgba(36, 6, 54, 0.8)',
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        paddingHorizontal: 16,
        maxHeight: 100,
        fontSize: 15,
    },
    sendButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginLeft: 8,
    },
    sendButtonText: {
        color: '#0F011A',
        fontWeight: '900',
        fontSize: 12,
        letterSpacing: 1,
    }
});
