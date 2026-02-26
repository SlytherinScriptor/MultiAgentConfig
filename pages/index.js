import Head from 'next/head';
import * as Sentry from '@sentry/nextjs';
import { ErrorBoundary } from 'react-error-boundary';

function Home() {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      onError={(error) => {
        if (error instanceof Error) {
          Sentry.captureException(error);
        } else {
          Sentry.captureException(new Error('Unknown error')); // or some other way to handle non-Error errors
        }
      }}
    >
      <div>
        <Head>
          <title>WebApp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>Welcome to WebApp</h1>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default Home;