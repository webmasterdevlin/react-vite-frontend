import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { EndPoints, api } from '../http-client/api-config.ts';

const isDevelopment = process.env.NODE_ENV === 'development';

type healthResponse = { status: string; database_connection_url: string };

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const [message, setMessage] = useState<healthResponse>();

  useEffect(() => {
    // TODO: Add Authorization header
    api.get<healthResponse>(`${EndPoints.health}`).then(res => {
      setMessage(res.data);
    });
  }, []);

  return (
    <div className={'flex h-screen flex-col items-center justify-center'}>
      <h2>React Vite + FastAPI is running on &apos;{isDevelopment ? 'dev' : 'prod'}&apos; environment</h2>
      <h3>{JSON.stringify(message, null, 2)}</h3>
    </div>
  );
}
