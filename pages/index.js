import Head from 'next/head';

function Home() {
  try {
    return (
      <div>
        <Head>
          <title>WebApp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>Welcome to WebApp</h1>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error in index.js:', error);
    // Log the error to a logging service or analytics platform
    // For example, using Sentry:
    // Sentry.captureException(error);
    return <div>Error occurred: {error.message}</div>;
  }
}

export default Home;