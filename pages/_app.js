import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login if the current route is /
    if (router.pathname === "/") {
      router.push("/login");
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
