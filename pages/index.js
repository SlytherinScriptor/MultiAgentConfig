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
          if (!Sentry.captureException.called) {
            Sentry.captureException(error);
          }
        } else {
          if (!Sentry.captureException.called) {
            Sentry.captureException(new Error('Unknown error'));
          }
        }
      }}
    >
      <Head>
        <title>Home</title>
      </Head>
    </ErrorBoundary>
  );
}

export default Home;