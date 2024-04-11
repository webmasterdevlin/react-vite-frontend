import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router';
import React from 'react';
import MainNav from '../components/MainNav';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';
import type { Auth } from '../models/auth';
import type { QueryClient } from '@tanstack/react-query';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => {
        return null;
      } // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        {
          return import('@tanstack/router-devtools').then(res => {
            return {
              default: res.TanStackRouterDevtools,
              // For Embedded Mode
              // default: res.TanStackRouterDevtoolsPanel
            };
          });
        },
      );

/* Show a global spinner when the router is transitioning */
function RouterSpinner() {
  const isLoading = useRouterState({
    select: s => {
      return s.status === 'pending';
    },
  });
  return <Spinner show={isLoading} />;
}

type RouterContextType = {
  auth: Auth;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContextType>()({
  component: RootComponent,
  notFoundComponent: () => {
    return <h1>Fancy meeting you here. Tell the developers to customize this page.</h1>;
  },
});

function RootComponent() {
  const auth = useAuth();
  return (
    <>
      <div className={'flex min-h-screen flex-col'}>
        <div className={'flex items-center gap-2 border-b'}>
          <div className="flex w-full items-center justify-between">
            <h1 className={'p-2 text-3xl'}>Kitchen Sink 🍴</h1>
            <pre className="text-indigo-500">{auth?.username}</pre>
          </div>
          <div className={'text-3xl'}>
            <RouterSpinner />
          </div>
        </div>
        <div className={'flex flex-1'}>
          <MainNav />
          <div className={'flex-1 border-l border-gray-200'}>
            {/* Render our first route match */}
            <Outlet />
          </div>
        </div>
      </div>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
