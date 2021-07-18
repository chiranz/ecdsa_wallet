import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalMessage from "../components/GlobalMessage";
import { WalletProvider } from "../context/WalletContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <WalletProvider>
        <Header />
        <GlobalMessage />
        <Component {...pageProps} />
      </WalletProvider>
      <Footer />
    </div>
  );
}
export default MyApp;
