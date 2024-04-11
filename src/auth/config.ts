import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    authority: 'https://login.microsoftonline.com/fe27d8e0-45bb-4ebd-8e03-c7f43f28377b',
    clientId: '09769bc3-e742-44d9-bfef-aedf8c2addc3',
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: '/',
    redirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read'], // Add other scopes as needed
};
export const msalInstance = new PublicClientApplication(msalConfig);
