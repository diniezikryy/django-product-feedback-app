import Head from "next/head";
import Navbar from "../components/Navbar";

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
