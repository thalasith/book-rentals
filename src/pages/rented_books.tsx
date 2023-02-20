import { type NextPage } from "next";
import Head from "next/head";

import { WalletSelectorContextProvider } from "../contexts/WalletSelectorContext";

import Header from "../components/Header";
import { RentedBooks } from "../components/RentedBooks";

const Home: NextPage = () => {
  // api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Welcome to our library!</title>
        <meta name="description" content="Library for book rentals in Web3!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <WalletSelectorContextProvider>
          <Header />
          <div className="z-0 mx-2 flex min-h-screen w-10/12 flex-col px-2 pt-12 lg:mx-auto lg:flex-row lg:px-8">
            <RentedBooks />
          </div>
        </WalletSelectorContextProvider>
      </main>
    </>
  );
};

export default Home;
