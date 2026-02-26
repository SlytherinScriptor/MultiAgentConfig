import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  try {
    return <Component {...pageProps} />;
  } catch (error) {
    console.error('Error in _app.js:', error);
    // Log the error to a logging service or analytics platform
    // For example, using Sentry:
    // Sentry.captureException(error);
    return <div>Error occurred: {error.message}</div>;
  }
}

export default MyApp;
