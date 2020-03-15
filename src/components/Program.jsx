import React, { useState, useEffect } from "react";
import BoxWithHeader from "./BoxWithHeader";
import locationPin from "../icons/location-pin.svg";
import css from "./program.less";

import * as firebase from "firebase/app";
require("firebase/firestore");

const hoylandKirkeLink =
  "https://www.google.no/maps/place/H%C3%B8yland+kirke/@58.8308932,5.7485179,17z/data=!3m1!4b1!4m5!3m4!1s0x463a37048f2aabc9:0x3e337ee987666139!8m2!3d58.8308932!4d5.7507066?hl=no";

const froylandGardLink =
  "https://www.google.no/maps/place/Fr%C3%B8yland+Gard/@58.776594,5.7248356,17z/data=!4m12!1m6!3m5!1s0x463a39cc9dbc2e1f:0x8b0269a787ae74c4!2sFr%C3%B8yland+Gard!8m2!3d58.776594!4d5.7270243!3m4!1s0x463a39cc9dbc2e1f:0x8b0269a787ae74c4!8m2!3d58.776594!4d5.7270243?hl=no";

const ruteLink =
  "https://www.google.no/maps/dir/H%C3%B8yland+kirke,+Sandnes/Fr%C3%B8yland+Gard,+Fr%C3%B8ylandsvegen,+Kvernaland/@58.8098379,5.699762,13z/am=t/data=!4m15!4m14!1m5!1m1!1s0x463a3704ed522f0f:0x8c507f1ee4d781b1!2m2!1d5.750392!2d58.831448!1m5!1m1!1s0x463a39cc9dbc2e1f:0x8b0269a787ae74c4!2m2!1d5.7270243!2d58.776594!3e0!5i2";

const Program = ({ refProp }) => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    firebase
      .firestore()
      .collection("program")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          setEvents(oldEvents => ({ ...oldEvents, [doc.id]: doc.data() }));
        });
      });
  }, []);

  const sortedEvents =
    Object.keys(events).length > 0
      ? Object.entries(events)
          .sort(([id1, e1], [id2, e2]) =>
            e1.index < e2.index ? -1 : e1.index === e2.index ? 0 : 1
          )
          .map(([id, e]) => e)
      : [];

  return (
    <BoxWithHeader header="Programmet" refProp={refProp}>
      <div className={css.container}>
        <div className={css.eventList}>
          {sortedEvents.map(e => (
            <div key={e.title} className={css.event}>
              {e.time ? `${e.time} -` : ""} {e.title}
            </div>
          ))}
        </div>

        <div className={css.linksAndMenuContainer}>
          <div className={css.links}>
            <MapLink href={hoylandKirkeLink} label="Høyland Kirke" />
            <MapLink href={froylandGardLink} label="Frøyland gard" />
          </div>

          <div className={css.menuContainer}>
            <div className={css.menuHeader}>Forrett</div>
            <div className={css.menuDescription}>
              Kveite ceviche, koriander-mulsjon og sesamknekkis
            </div>
            <div className={css.menuHeader}>Hovedrett</div>
            <div className={css.menuDescription}>
              Entrecote av jærkalv med sesonggrønnsaker, balsamicosaus og
              hvitløkspoteter
            </div>
            <div className={css.menuHeader}>Dessert</div>
            <div className={css.menuDescription}>
              Peanøttmousse med banansorbet, banankjeks og sjokoladesaus
            </div>
          </div>
        </div>
      </div>
    </BoxWithHeader>
  );
};

const MapLink = ({ href, label }) => (
  <div className={css.link}>
    <img src={locationPin} alt="" />
    <a href={href} target="__blank">
      {label}
    </a>
  </div>
);

export default Program;