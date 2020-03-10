import React from "react";
import css from "./box-with-header.less";

const BoxWithHeader = ({ header, children }) => {
  return (
    <div className={css.container}>
      <div className={css.header}>{header}</div>
      {children}
    </div>
  );
};

export default BoxWithHeader;
