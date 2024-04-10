import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { EndPoints, api } from '../http-client/api-config.ts';

const isDevelopment = process.env.NODE_ENV === 'development';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const [message, setMessage] = useState<{ status: string; database_connection_url: string }>();

  useEffect(() => {
    api.get(`${EndPoints.health}`).then(res => {
      setMessage(res.data.message);
    });
  }, []);

  return (
    <div className={'flex h-screen flex-col items-center justify-center'}>
      <h2>React Vite + FastAPI on {isDevelopment ? 'dev' : 'prod'} environment</h2>
      <h3>Sending HTTP requests to {import.meta.env.VITE_BASE_URL}</h3>
      <h3>{JSON.stringify(message, null, 2)}</h3>
    </div>
  );
}
