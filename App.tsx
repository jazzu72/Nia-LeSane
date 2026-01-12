import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import { StatusBar } from 'expo-status-bar';

import { theme } from './src/styles/theme';
import { SECRETS } from './src/config/secrets';
import AuthScreen from './src/screens/AuthScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <StripeProvider
            publishableKey={SECRETS.STRIPE.PUBLISHABLE_KEY}
            merchantIdentifier={SECRETS.STRIPE.MERCHANT_ID}
        >
            <NavigationContainer theme={{
                dark: true,
                colors: {
                    primary: theme.colors.primary,
                    background: theme.colors.background,
                    card: theme.colors.card,
                    text: theme.colors.text,
                    border: 'transparent',
                    notification: theme.colors.primary,
                }
            }}>
                <StatusBar style="light" />
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: theme.colors.background,
                        },
                        headerTintColor: theme.colors.primary,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                        options={{
                            title: 'Nia LeSane CEO',
                            headerLeft: () => null // Prevent going back to Auth
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StripeProvider>
    );
}
