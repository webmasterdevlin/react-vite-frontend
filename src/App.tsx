import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, ErrorComponent, RouterProvider } from '@tanstack/react-router';
import Spinner from './components/Spinner';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  defaultErrorComponent: ({ error }: any) => {
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
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
