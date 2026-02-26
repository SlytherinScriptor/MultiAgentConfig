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
    return <div>Error occurred</div>;
  }
}

export default Home;