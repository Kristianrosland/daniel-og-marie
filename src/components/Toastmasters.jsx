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
            Siri Kjøren og Kristian Hartmann
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
          <a className={css.contactInfo} href="tel:+4740048331">
            <img src={phone} alt="" />
            +47 400 48 331
          </a>
          <a
            className={css.contactInfo}
            href="mailto:kristian.hartmann@gmail.com"
          >
            <img src={mail} alt="" className={css.mail} />
            kristian.hartmann@gmail.com
          </a>
          <a
            className={css.contactInfo}
            href="https://facebook.com/kristian.hartmann"
            target="__blank"
          >
            <img src={fb} alt="" className={css.fb} />
            kristian.hartmann
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
