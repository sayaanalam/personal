import '../styles/index.css'
import { AppProps } from 'next/app'
import { DesktopNavigation, MobileNavigation } from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DesktopNavigation /> {/* Use DesktopNavigation or MobileNavigation here */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
