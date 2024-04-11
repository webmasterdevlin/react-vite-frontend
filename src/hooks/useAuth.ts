import { useMsal } from '@azure/msal-react';

import { loginRequest } from '../auth/config';
import type { Auth } from '../models/auth';
export default function useAuth(): Auth {
  const { instance, accounts } = useMsal();

  return {
    login: () => {
      instance?.loginRedirect(loginRequest);
    },
    logout: () => {
      instance?.logout({ postLogoutRedirectUri: '/' });
    },
    status: accounts.length === 0 ? 'loggedOut' : 'loggedIn',
    username: accounts[0]?.username,
  };
}
