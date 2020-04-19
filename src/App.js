import React, { useRef } from "react";

import Toastmasters from "./components/Toastmasters";
import Gifts from "./components/Gifts";
import RSVPDataWrapper from "./components/RSVPDataWrapper";
import Countdown from "./components/Countdown";
import Program from "./components/Program";
import OmBrudeparet from "./components/OmBrudeparet";
import Forlovere from "./components/Forlovere";
import FAQ from "./components/FAQ";
import AdminApp from "./admin/AdminApp";
import CoronaInformation from "./components/CoronaInformation";

import { FirebaseAuthProvider } from "@react-firebase/auth";
import config from "./firebase.config.js";
import firebase from "firebase/app";
import "firebase/auth";

import svolvaerGeita from "./images/svolvaer.png";
import css from "./app.less";

/*****************************/
/* HUSK Å ENDRE BEGGE STEDER */
/*****************************/
const menuItems = [
  { text: "Kommer du?" },
  { text: "Tale?" },
  { text: "Hvem er vi?" },
  { text: "Program" },
  { text: "Gaveønsker" },
  { text: "FAQ" },
];

const App = () => {
  const rsvpRef = useRef(null);
  const toastmasterRef = useRef(null);
  const giftsRef = useRef(null);
  const programRef = useRef(null);
  const omBrudeparetRef = useRef(null);
  const faqRef = useRef(null);

  const scrollTo = (menuItem) => {
    let ref = null;
    if (menuItem === "Kommer du?") {
      ref = rsvpRef;
    } else if (menuItem === "Tale?") {
      ref = toastmasterRef;
    } else if (menuItem === "Program") {
      ref = programRef;
    } else if (menuItem === "Hvem er vi?") {
      ref = omBrudeparetRef;
    } else if (menuItem === "Gaveønsker") {
      ref = giftsRef;
    } else if (menuItem === "FAQ") {
      ref = faqRef;
    }

    if (ref && ref.current && ref.current.offsetTop) {
      window.scrollTo(0, ref.current.offsetTop - 15);
    }
  };

  const showAdmin = window.location.href.includes("admin");

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      {showAdmin ? (
        <AdminApp />
      ) : (
        <div className={css.app}>
          <div className={css.contentContainer}>
            <h1 className={css.header}>Marie & Daniel</h1>
            <p className={css.date}>07.11.2020</p>
            <div className={css.gifterSeg}>Gifter seg!</div>

            <div className={css.headerImageContainer}>
              <div className={css.hashtag}>#marieogdaniel2020</div>
              <img src={svolvaerGeita} alt="Daniel og Marie på svolværgeita" />
            </div>

            <div className={css.menuBar}>
              {menuItems.map((item) => (
                <span
                  key={item.text}
                  className={css.menuItem}
                  onClick={() => scrollTo(item.text)}
                >
                  {item.text}
                </span>
              ))}
            </div>

            <Countdown />

            <CoronaInformation />

            <RSVPDataWrapper refProp={rsvpRef} />

            <Toastmasters refProp={toastmasterRef} />

            <OmBrudeparet refProp={omBrudeparetRef} />

            <Forlovere />

            <Program refProp={programRef} />

            <Gifts refProp={giftsRef} />

            <FAQ refProp={faqRef} />
          </div>
        </div>
      )}
    </FirebaseAuthProvider>
  );
};

export default App;
