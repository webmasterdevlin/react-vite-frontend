import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, useRouterState, createRootRoute } from '@tanstack/react-router';
import React from 'react';
import Spinner from '../components/Spinner';

/* Show a global spinner when the router is transitioning */
function RouterSpinner() {
  const isLoading = useRouterState({
    select: s => {
      return s.status === 'pending';
    },
  });
  return <Spinner show={isLoading} />;
}

export const Route = createRootRoute({
  component: RootComponent,
});

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

function RootComponent() {
  return (
    <>
      <div className={' bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-white'}>
        <RouterSpinner />
        <Outlet />
      </div>
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
