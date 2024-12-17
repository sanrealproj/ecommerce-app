import React from "react";
import Headers from "./Headers";
import Footers from "./Footers";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Navigation /> */}
      <div style={{ minHeight: "400px", textAlign: "center" }}>{children}</div>
      <Footers />
    </>
  );
};

export default React.memo(Layout);
