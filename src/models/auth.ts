export type Auth = {
  login: () => void;
  logout: () => void;
  status: 'loggedOut' | 'loggedIn';
  username?: string;
};
