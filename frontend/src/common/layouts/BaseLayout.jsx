import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "../../features/user";
import Navbar from "../components/utils/Navbar";

const BaseLayout = ({ title, content, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>

      <Navbar />

      <div>{children}</div>
    </div>
  );
};

export default BaseLayout;
