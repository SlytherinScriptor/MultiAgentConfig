import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  try {
    return <Component {...pageProps} />;
  } catch (error) {
    console.error('Error in _app.js:', error);
    return <div>Error occurred</div>;
  }
}

export default MyApp;