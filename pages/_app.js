import React from 'react';
import '../styles/globals.css';
import { store } from "../src/app/store";
import { Provider } from 'react-redux'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Provider store={store} >
        <Component {...pageProps} />
      </Provider>
    </main>
    
  );
}

export default MyApp;