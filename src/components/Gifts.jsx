import React from "react";
import copenhagen from "../images/copenhagen.png";
import servise from "../images/servise.png";
import css from "./gifts.less";

const gavelisteUrl =
  "https://www.gavelisten.no/list/XRTDTXF/guest?fbclid=IwAR3DIOIo-j4RhixuOIAgiThyuCWQt0Ufe089jjW7qEQqX5EsBDgwd4t42yk";

const tilbordsListe =
  "https://www.tilbords.no/bryllup/vis-liste/?wishListId=58490";

const Gifts = ({ refProp }) => {
  return (
    <div className={css.container} ref={refProp}>
      <div className={css.header}>Gaveønsker</div>
      <div className={css.topContainer}>
        <div className={css.logoContainer}>
          <img src={copenhagen} alt="Royal Copenhagen logo" />
        </div>
        <p className={css.description}>
          Den viktigste gaven for oss er å få samlet venner og familie fra{" "}
          <span>nord</span>, <span>sør</span>, <span>øst</span> og{" "}
          <span>vest</span> på dagen vår. Vi ønsker oss i hovedsak deler av
          Musselmalt Riflet servise fra Royal Copenhagen. Delene av serviset og
          våre andre ønsker finner du samlet i gavelisten under.
        </p>
      </div>
      <img
        src={servise}
        alt="Musselmalt riflet servise fra Copenhagen"
        className={css.servise}
      />

      <div className={css.link}>
        Vi har opprettet to gavelister.
        <br />
        <br />
        Den ene listen finnes fysisk i alle Tilbordsbutikker og digitalt{" "}
        <a href={tilbordsListe} target="_blank" rel="noopener noreferrer">
          her
        </a>
        .
        <br />
        <br />
        Den andre listen inneholder ønsker som ikke finnes på Tilbords, og
        finnes kun i digital versjon{" "}
        <a href={gavelisteUrl} target="_blank" rel="noopener noreferrer">
          her
        </a>
        .
        <br />
        <br />
        Vi ønsker oss også gavekort fra Tilbords, med tanke på deres
        beleilighet.
      </div>

      <div className={css.psst1}>Psst..</div>
      <div className={css.psst2}>
        Husk å registrere gaven som kjøpt inne på gavelisten
      </div>
    </div>
  );
};

export default Gifts;
