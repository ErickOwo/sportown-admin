import Head from 'next/head';
import '@styles/tailwind.css';
import { ProviderAuth } from '@hooks/use-auth';

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <Head>
        <title>Admin SporTown</title>
        <meta name="description" content="Administración de página SporTown" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div>
        <main className="w-full max-w-none">
          <Component {...pageProps} />
        </main>
      </div>
    </ProviderAuth>
  );
}

export default MyApp;
