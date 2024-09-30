import { Inter } from "next/font/google";
import { useRef, ReactNode, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { SearchProvider } from "../context/SearchContext/SearchContext";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import Router from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: { children: ReactNode }) => {
  const ref = useRef<LoadingBarRef | null>(null);

  //progress bar
  useEffect(() => {
    // Start the loading bar when route change starts
    const handleRouteChangeStart = () => {
      if (ref.current) {
        ref.current.continuousStart(); // Start the loading bar with continuous progress
      }
    };

    // Complete the loading bar when the route change is done
    const handleRouteChangeComplete = () => {
      if (ref.current) {
        ref.current.complete(); // Complete and hide the loading bar
      }
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeComplete);

    // Clean up events on unmount
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, []);

  return (
    <div className={`font-mono ${inter.className} flex flex-col min-h-screen`}>
      <LoadingBar
        color="#f87171"
        ref={ref}
        shadow={true}
        height={4}
        className="z-50"
      />
      <SearchProvider>
        <Header />
        <main className="min-w-[350px] flex-grow">{children}</main>
        <Footer />
      </SearchProvider>
    </div>
  );
};

export default Layout;
