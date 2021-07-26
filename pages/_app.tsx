import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalMessage from "../components/GlobalMessage";
import { GlobalProvider } from "../context/Global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <GlobalProvider>
        <Header />
        <GlobalMessage />
        <Component {...pageProps} />
      </GlobalProvider>
      <Footer />
    </div>
  );
}
export default MyApp;
