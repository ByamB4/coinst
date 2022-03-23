import "styles/globals.css";
import type { AppProps } from "next/app";

interface Props extends AppProps {}

const _ = ({ Component, pageProps }: Props) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default _;
