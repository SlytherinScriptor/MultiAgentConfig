import Head from 'next/head';
import * as Sentry from '@sentry/nextjs';

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
    Sentry.captureException(error);
    return <div>Error occurred: {error.message}</div>;
  }
}

export default Home;