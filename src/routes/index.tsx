import { useMsal } from '@azure/msal-react';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { loginRequest } from '../auth/config.ts';
import { EndPoints, api } from '../http-client/api-config.ts';

const isDevelopment = process.env.NODE_ENV === 'development';

type healthResponse = { status: string; database_connection_url: string };

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const [message, setMessage] = useState<healthResponse>();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const request = {
      ...loginRequest,
      account: accounts[0], // Assuming the user is logged in and the account is cached
    };

    instance.acquireTokenSilent(request).then(response => {
      api
        .get<healthResponse>(`${EndPoints.health}`, {
          headers: {
            Authorization: 'Bearer ' + response.accessToken,
          },
        })
        .then(res => {
          setMessage(res.data);
        });
    });
  }, []);

  return (
    <div className={'flex h-screen flex-col items-center justify-center'}>
      <h2>React Vite + FastAPI is running on &apos;{isDevelopment ? 'dev' : 'prod'}&apos; environment</h2>
      <h3>{JSON.stringify(message, null, 2)}</h3>
    </div>
  );
}
