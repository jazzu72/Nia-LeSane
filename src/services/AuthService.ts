import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { SECRETS } from '../config/secrets';

// Ensure WebBrowser can handle redirects
WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: `${SECRETS.OIDC.AUTHORITY}/oauth2/v2.0/authorize`,
    tokenEndpoint: `${SECRETS.OIDC.AUTHORITY}/oauth2/v2.0/token`,
    revocationEndpoint: `${SECRETS.OIDC.AUTHORITY}/oauth2/v2.0/logout`,
};

export const useOidcAuth = () => {
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: SECRETS.OIDC.CLIENT_ID,
            scopes: ['openid', 'profile', 'email'],
            redirectUri: SECRETS.OIDC.REDIRECT_URI,
        },
        discovery
    );

    return {
        request,
        response,
        promptAsync,
    };
};
