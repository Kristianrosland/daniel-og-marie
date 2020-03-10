import React from "react";
import Toastmasters from "./components/Toastmasters";
import Gifts from "./components/Gifts";
import RSVPDataWrapper from "./components/RSVPDataWrapper";

import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import config from "./firebase.config.js";

import svolvaerGeita from "./images/svolvaer.png";
import css from "./app.less";

const menuItems = [
  { text: "Kommer du?", ref: null },
  { text: "Tale?", ref: null },
  { text: "Program", ref: null },
  // { text: "Hvem er vi?", ref: null },
  { text: "Gaveønsker", ref: null }
  // { text: "FAQ", ref: null }
];

const App = () => {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div className={css.app}>
        <div className={css.contentContainer}>
          <h1 className={css.header}>Marie & Daniel</h1>
          <p className={css.date}>07.11.2020</p>

          <img
            src={svolvaerGeita}
            alt="Daniel og Marie på svolværgeita"
            className={css.headerImage}
          />

          <div className={css.menuBar}>
            {menuItems.map(item => (
              <span key={item.text} className={css.menuItem}>
                {item.text}
              </span>
            ))}
          </div>

          <RSVPDataWrapper />

          <Toastmasters />

          <Gifts />
        </div>
      </div>
    </FirebaseAuthProvider>
  );
};

export default App;
