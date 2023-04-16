import Header from "@/components/Header/Header";
import UserContextProvider from "@/context/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Header />
      <div className="max-w-screen-xl justify-center overflow-auto items-centernter flex mx-auto">
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
}
