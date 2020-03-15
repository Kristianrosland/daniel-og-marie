import React from "react";
import BoxWithHeader from "./BoxWithHeader";
import toastmasters from "../images/toastmasters.png";
import arrow from "../icons/arrow.png";
import css from "./toastmasters.less";
import phone from "../icons/phone.png";
import mail from "../icons/mail.png";
import fb from "../icons/fb.png";
import ig from "../icons/ig.png";
import classnames from "classnames";

const Toastmasters = ({ refProp }) => {
  return (
    <BoxWithHeader header="The Toastmasters" refProp={refProp}>
      <div className={css.container}>
        <div className={css.topContainer}>
          <div className={css.description}>
            Har du lyst til å holde tale?
            <br />
            Gi beskjed til våre to flotte toastmastere
            <br />
            <br />
            <br />
            Siri og Kristian
            <div className={css.nicknameDescription}>
              (bedre kjent av familien Rosland som advokaten og psykologen)
            </div>
          </div>

          <div className={css.imageContainer}>
            <img
              src={toastmasters}
              className={css.toastmasters}
              alt="Bilde av toastmastere"
            />
            <div className={classnames(css.permanentMarker, css.advokaten)}>
              Advokaten
              <img src={arrow} alt="pil" />
            </div>
            <div className={classnames(css.permanentMarker, css.psykologen)}>
              Psykologen
              <img src={arrow} alt="pil" />
            </div>
          </div>
        </div>

        <div className={css.bottomContainer}>
          <a className={css.contactInfo} href="tel:+4791166004">
            <img src={phone} alt="" />
            +47 911 66 004
          </a>
          <a className={css.contactInfo} href="mailto:sirikjoren@gmail.com">
            <img src={mail} alt="" className={css.mail} />
            sirikjoren@gmail.com
          </a>
          <a
            className={css.contactInfo}
            href="https://www.facebook.com/profile.php?id=556471128"
            target="__blank"
          >
            <img src={fb} alt="" className={css.fb} />
            Siri Kjøren
          </a>
          <a
            className={css.contactInfo}
            href="https://instagram.com/kristianhartmann"
            target="__blank"
          >
            <img src={ig} alt="" />
            @kristianhartmann
          </a>
        </div>
      </div>
    </BoxWithHeader>
  );
};

export default Toastmasters;
