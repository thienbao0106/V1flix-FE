import React from "react";
//Components
import Header from "../components/Header/Header";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
const urlBlackList: string[] = ["/login", "/register"];

const BaseLayout: React.FC<any> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      {urlBlackList.indexOf(pathname) === -1 ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default BaseLayout;
