import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { EndPoints, api } from '../http-client/api-config.ts';

const isDevelopment = process.env.NODE_ENV === 'development';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`${EndPoints.hello}/devlin`).then(res => {
      setMessage(res.data.message);
    });
  }, []);

  return (
    <div className={'flex h-screen flex-col items-center justify-center'}>
      {message !== '' && <h1>{message}!</h1>}
      <h2>React Vite + FastAPI on {isDevelopment ? 'dev' : 'prod'} environment</h2>
      <h3>Sending HTTP requests to {import.meta.env.VITE_BASE_URL}</h3>
    </div>
  );
}
