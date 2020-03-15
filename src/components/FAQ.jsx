import React from "react";
import css from "./faq.less";

const FAQ = ({ refProp }) => {
  return (
    <div ref={refProp} className={css.container}>
      <h2 className={css.header}>Spørsmål og svar</h2>
      <ul className={css.faqList}>
        <li className={css.faq}>
          <div className={css.questionContainer}>
            <div className={css.question}>Spørsmål</div>
          </div>
          <div className={css.answer}>Svar</div>
        </li>
        <li className={css.faq}>
          <div className={css.questionContainer}>
            <div className={css.question}>Spørsmål</div>
          </div>
          <div className={css.answer}>Svar</div>
        </li>
        <li className={css.faq}>
          <div className={css.questionContainer}>
            <div className={css.question}>Spørsmål</div>
          </div>
          <div className={css.answer}>Svar</div>
        </li>
        <li className={css.faq}>
          <div className={css.questionContainer}>
            <div className={css.question}>Spørsmål</div>
          </div>
          <div className={css.answer}>Svar</div>
        </li>
        <li className={css.faq}>
          <div className={css.questionContainer}>
            <div className={css.question}>Spørsmål</div>
          </div>
          <div className={css.answer}>Svar</div>
        </li>
        <li className={css.faq}>
          <div className={css.questionContainer}>
            <div className={css.question}>Spørsmål</div>
          </div>
          <div className={css.answer}>Svar</div>
        </li>
      </ul>
      <p className={css.contactInformation}>
        Hvis du lurer på noe kan du ringe Daniel på 45 28 55 79
      </p>
    </div>
  );
};

export default FAQ;
