import '../styles/globals.css';
import * as Sentry from '@sentry/nextjs';

function MyApp({ Component, pageProps }) {
  try {
    return <Component {...pageProps} />;
  } catch (error) {
    Sentry.captureException(error);
    return <div>Error occurred: {error.message}</div>;
  }
}

export default MyApp;