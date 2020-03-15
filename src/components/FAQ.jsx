import React from "react";
import css from "./faq.less";

const FAQ = ({ refProp }) => {
  return <div ref={refProp} className={css.container} />;
};

export default FAQ;
