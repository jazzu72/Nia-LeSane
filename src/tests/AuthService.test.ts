import { useOidcAuth } from '../services/AuthService';
import * as AuthSession from 'expo-auth-session';

// Mock AuthSession
jest.mock('expo-auth-session', () => ({
    useAuthRequest: jest.fn(),
}));

// Mock WebBrowser
jest.mock('expo-web-browser', () => ({
    maybeCompleteAuthSession: jest.fn(),
}));

describe('AuthService', () => {
    it('useOidcAuth should call useAuthRequest with correct config', () => {
        const mockPromptAsync = jest.fn();
        (AuthSession.useAuthRequest as jest.Mock).mockReturnValue([
            { url: 'test-url' }, // request
            null, // response
            mockPromptAsync, // promptAsync
        ]);

        const { request, response, promptAsync } = useOidcAuth();

        expect(AuthSession.useAuthRequest).toHaveBeenCalled();
        expect(request?.url).toBe('test-url');
        expect(response).toBeNull();
        expect(promptAsync).toBe(mockPromptAsync);
    });
});
