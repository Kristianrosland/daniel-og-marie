import React, { useEffect, useState } from "react";
import css from "./faq.less";
import sortBy from "lodash.sortby";
import * as firebase from "firebase/app";
require("firebase/firestore");

const FAQ = ({ refProp }) => {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("faq")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          setFaq(prevFaq => [...prevFaq, doc.data()]);
        });
      });
  }, []);

  const alleSporsmalOgSvar = sortBy(faq, "index");

  return (
    <div ref={refProp} className={css.container}>
      <h2 className={css.header}>Spørsmål og svar</h2>
      <ul className={css.faqList}>
        {alleSporsmalOgSvar.map(sporsmalOgSvar => (
          <li className={css.faq} key={sporsmalOgSvar.index}>
            <div className={css.questionContainer}>
              <div className={css.question}>{sporsmalOgSvar.sporsmal}</div>
            </div>
            <div className={css.answer}>{sporsmalOgSvar.svar}</div>
          </li>
        ))}
      </ul>
      <p className={css.contactInformation}>
        Hvis du lurer på noe kan du ringe Daniel på 45 28 55 79
      </p>
    </div>
  );
};

export default FAQ;
