export type navigationProps = {
  pathname: string;
  private: boolean;
};

export const navigation = {
  signIn: {
    pathname: '/',
    private: false,
  },
  signUp: {
    pathname: '/sign-up',
    private: false,
  },
  settings: {
    pathname: '/settings',
    private: true,
  },
  messenger: {
    pathname: '/messenger',
    private: true,
  },
  notFound: {
    pathname: '/404',
    private: false,
  },
  serverError: {
    pathname: '/500',
    private: false,
  },
  other: {
    pathname: '*',
    private: false,
  },
};

export const authorizationPathnames = [
  navigation.signIn.pathname,
  navigation.signUp.pathname,
];
