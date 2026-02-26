import Head from 'next/head';
import * as Sentry from '@sentry/nextjs';
import { ErrorBoundary } from 'react-error-boundary';

function Home() {
  return (
    <ErrorBoundary
      FallbackComponent={() => <div>Error occurred</div>}
      onError={(error) => Sentry.captureException(error)}
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