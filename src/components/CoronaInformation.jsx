import React from "react";
import classNames from "classnames";
import corona from "../images/corona.png";
import css from "./corona-information.less";

const CoronaInformation = () => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        Oppdatering 16.08.2020: Bryllupet gjennomføres!
      </div>

      <div className={css.row}>
        <div className={css.descriptionContainer}>
          <div className={classNames(css.description, css.bottomBorder)}>
            Som nevnt tidligere i år skulle vi komme tilbake med mer info
            angående Covid-19.
            <br />
            <br />
            Slik som situasjonen er i dag, gitt de restriksjonene myndighetene
            har satt så har vi bestemt oss for å gjennomføre bryllupet
            07.11.2020. Bryllupet blir likevel ikke helt som planlagt - vi har
            en del retningslinjer som vi ønsker å forholde oss til. Mer info om
            dette kommer.
            <br />
            <br />I mellomtiden håper vi alle er friske, holder seg unna folk og
            vasker hendene!
          </div>

          <div className={css.regards}>Hilsen Daniel og Marie</div>
        </div>
        <img
          src={corona}
          className={css.coronaImage}
          alt="Bilde av korona-viruset"
        />
      </div>
    </div>
  );
};

export default CoronaInformation;
