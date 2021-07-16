import Head from "next/head";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputField from "../components/InputField";
import Transfer from "../components/Transfer";
import styles from "../styles/Home.module.css";

export default function Home() {
  const handleConnect = () => {
    console.log("Connecting...");
  };
  return (
    <>
      <Head>
        <title>ECDSA | Home</title>
        <meta name="description" content="minimal crypto wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h2>Connect Wallet</h2>
          <div>
            <InputField placeholder="your private key" onChange={() => {}} />
          </div>
          <Button onClick={handleConnect}>Connect</Button>
        </div>
        <Transfer />
      </main>
    </>
  );
}
