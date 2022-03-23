import Head from "next/head";
import React, { FC, ReactNode } from "react";

interface Props {
  title: string | ReactNode;
}
const NextHead: FC<Props> = ({ children, title }) => (
  <>
    <Head>
      {typeof title === "string" ? <title>{title} | Coinst</title> : title}
    </Head>
    {children}
  </>
);

export default NextHead;
