import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to ui!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
