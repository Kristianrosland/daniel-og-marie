import React from "react";
import classNames from "classnames";
import copenhagen from "../images/copenhagen.png";
import servise from "../images/servise.png";
import css from "./gifts.less";

const gavelisteUrl =
  "https://www.gavelisten.no/list/XRTDTXF/guest?fbclid=IwAR3DIOIo-j4RhixuOIAgiThyuCWQt0Ufe089jjW7qEQqX5EsBDgwd4t42yk";

const Gifts = ({ refProp }) => {
  return (
    <div className={css.container} ref={refProp}>
      <div className={css.header}>Gaveønsker</div>
      <div className={css.topContainer}>
        <div className={css.logoContainer}>
          <img src={copenhagen} alt="Royal Copenhagen logo" />
        </div>
        <p className={classNames(css.description, css.notMobile)}>
          Den viktigste gaven for oss er å få samlet venner og familie fra{" "}
          <span>nord</span>, <span>sør</span>, <span>øst</span> og{" "}
          <span>vest</span> på dagen vår. Vi ønsker oss i hovedsak deler av
          Musselmalt Riflet servise fra Royal Copenhagen. Delene av serviset og
          våre andre ønsker finner du samlet i gavelisten under.
        </p>

        <p className={classNames(css.description, css.onlyMobile)}>
          Den viktigste gaven for oss er å få samlet venner og familie fra{" "}
          <span>nord</span>, <span>sør</span>, <span>øst</span> og{" "}
          <span>vest</span> på dagen vår.
        </p>
      </div>
      <img
        src={servise}
        alt="Musselmalt riflet servise fra Copenhagen"
        className={css.servise}
      />

      <div className={css.link}>
        Trykk{" "}
        <a href={gavelisteUrl} target="__blank">
          her
        </a>{" "}
        for å se gavelisten
      </div>

      <div className={css.psst1}>Psst..</div>
      <div className={css.psst2}>
        Husk å registrere gaven som kjøpt inne på gavelisten
      </div>
    </div>
  );
};

export default Gifts;
