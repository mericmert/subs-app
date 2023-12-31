import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/post.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';


export default function App({ Component, pageProps }: AppProps) {


  return (
    <SessionProvider>
      <NextNProgress color='#6366F1' />
      <Layout>
        <Component {...pageProps} />
      </Layout>
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
