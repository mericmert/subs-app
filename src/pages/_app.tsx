import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@/styles/navbar.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';
import Loading from '@/components/Loading';

export default function App({ Component, pageProps }: AppProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {

    const start = async () => {
      setIsLoading(true);
    };
    const end = async () => {
      await new Promise(resolve => setTimeout(resolve, 250));
      setIsLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionProvider>
      {isLoading ? <Loading /> : (
        <>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </SessionProvider>
  )

}
