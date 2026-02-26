import '../styles/globals.css';
import * as Sentry from '@sentry/nextjs';
import { ErrorBoundary } from 'react-error-boundary';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary
      FallbackComponent={() => <div>Error occurred</div>}
      onError={(error) => Sentry.captureException(error)}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;