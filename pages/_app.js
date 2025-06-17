import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Script from 'next/script';
import { Roboto, Roboto_Mono, Roboto_Slab, PT_Serif } from 'next/font/google';
import Head from 'next/head';
import AccessibilityWidget from '../components/AccessibilityWidget';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const robotoMono = Roboto_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

const robotoSlab = Roboto_Slab({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-roboto-slab',
});

const ptSerif = PT_Serif({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-pt-serif',
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="images/logo.png" type="image/png" sizes="32x32" />
        <title>GamerStore</title>
      </Head>

      <div className={`${roboto.className} ${roboto.variable} ${robotoMono.variable} ${robotoSlab.variable} ${ptSerif.variable}`}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </div>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />

      <Script src="https://plugin.prodeaf.com/latest/prodeaf.min.js" strategy="afterInteractive" />

      <AccessibilityWidget />
    </>
  );
}

export default MyApp;
