import React from 'react';
import renderer from 'react-test-renderer';
import AuthScreen from '../screens/AuthScreen';

// Mock navigation
const mockNavigation = {
    replace: jest.fn(),
};

// Mock Stripe
jest.mock('@stripe/stripe-react-native', () => ({
    StripeProvider: ({ children }) => children,
    useStripe: () => ({ initPaymentSheet: jest.fn(), presentPaymentSheet: jest.fn() }),
}));

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    return Reanimated;
});

// Mock AuthService (OIDC)
jest.mock('../services/AuthService', () => ({
    useOidcAuth: () => ({
        request: null,
        response: null,
        promptAsync: jest.fn(),
    }),
}));

describe('AuthScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<AuthScreen navigation={mockNavigation} />).toJSON();
        expect(tree).toBeDefined();
    });

    // Note: Full interaction testing requires Enzyme or React Testing Library
    // checks would involve entering "AddieMaeLesane33" and checking mockNavigation.replace called
});
