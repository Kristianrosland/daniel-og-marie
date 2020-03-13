import React from "react";
import css from "./box-with-header.less";

const BoxWithHeader = ({ header, children, refProp }) => {
  return (
    <div className={css.container} ref={refProp}>
      <div className={css.header}>{header}</div>
      {children}
    </div>
  );
};

export default BoxWithHeader;
