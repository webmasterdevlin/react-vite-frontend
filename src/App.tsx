import { MsalProvider } from '@azure/msal-react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, ErrorComponent, createRouter } from '@tanstack/react-router';

import Spinner from './components/Spinner';
import useAuth from './hooks/useAuth';
import { routeTree } from './routeTree.gen';
import type { IPublicClientApplication } from '@azure/msal-browser';

export const queryClient = new QueryClient();

const router = createRouter({
  context: {
    auth: undefined!, // We'll inject this when we render
    queryClient: queryClient,
  },
  defaultErrorComponent: ({ error }) => {
    return <ErrorComponent error={error} />;
  },
  defaultPendingComponent: () => {
    return (
      <div className={'p-2 text-2xl'}>
        <Spinner />
      </div>
    );
  },
  defaultPreload: 'intent',
  routeTree, // Preloading by "intent" works by using hover and touch start events on <Link> components to preload the dependencies for the destination route.
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router; // merge your router's exact types with exported hooks, components, and utilities.
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

type Props = {
  msalInstance: IPublicClientApplication;
};

function App({ msalInstance }: Props) {
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </MsalProvider>
  );
}
export default App;
