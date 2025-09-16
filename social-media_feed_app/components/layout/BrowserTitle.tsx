import { BrowserTitleProps } from "@/interfaces";
import Head from "next/head";

const BrowserTitle: React.FC<BrowserTitleProps> = ({ title }) => {
  const appName = "MySocial"; 
  const fullTitle = `${title} - ${appName}`;

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
};

export default BrowserTitle;