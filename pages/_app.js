import '../styles/globals.css';
import * as Sentry from '@sentry/nextjs';
import { ErrorBoundary } from 'react-error-boundary';

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;