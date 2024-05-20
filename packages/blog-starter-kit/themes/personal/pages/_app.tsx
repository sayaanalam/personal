// pages/_app.tsx

import '../styles/index.css'
import { AppProps } from 'next/app'
import { DesktopNavigation, MobileNavigation } from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
