import React, { useRef } from "react";
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
  { text: "Kommer du?" },
  { text: "Tale?" },
  { text: "Program" },
  // { text: "Hvem er vi?"  },
  { text: "Gaveønsker" }
  // { text: "FAQ"  }
];

const App = () => {
  const rsvpRef = useRef(null);
  const toastmasterRef = useRef(null);
  const giftsRef = useRef(null);

  const scrollTo = menuItem => {
    let ref = null;
    if (menuItem === "Kommer du?") {
      ref = rsvpRef;
    } else if (menuItem === "Tale?") {
      ref = toastmasterRef;
    } else if (menuItem === "Program") {
      // TODO
    } else if (menuItem === "Gaveønsker") {
      ref = giftsRef;
    }

    if (ref && ref.current && ref.current.offsetTop) {
      window.scrollTo(0, ref.current.offsetTop);
    }
  };

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div className={css.app}>
        <div className={css.contentContainer}>
          <h1 className={css.header}>Marie & Daniel</h1>
          <p className={css.date}>07.11.2020</p>
          <div className={css.gifterSeg}>Gifter seg !</div>

          <img
            src={svolvaerGeita}
            alt="Daniel og Marie på svolværgeita"
            className={css.headerImage}
          />

          <div className={css.menuBar}>
            {menuItems.map(item => (
              <span
                key={item.text}
                className={css.menuItem}
                onClick={() => scrollTo(item.text)}
              >
                {item.text}
              </span>
            ))}
          </div>

          <RSVPDataWrapper refProp={rsvpRef} />

          <Toastmasters refProp={toastmasterRef} />

          <Gifts refProp={giftsRef} />
        </div>
      </div>
    </FirebaseAuthProvider>
  );
};

export default App;
