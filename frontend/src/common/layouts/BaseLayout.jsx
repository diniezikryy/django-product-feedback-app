import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "../../features/user";
import Navbar from "../components/Navbar";

const BaseLayout = ({ title, content, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(refreshToken());
  }, [dispatch]);

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
