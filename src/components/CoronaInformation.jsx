import React from "react";
import classNames from "classnames";
import corona from "../images/corona.png";
import css from "./corona-information.less";

const CoronaInformation = () => {
  return (
    <div className={css.container}>
      <div className={css.header}>Koronaviruset?</div>

      <div className={css.row}>
        <div className={css.descriptionContainer}>
          <div className={classNames(css.description, css.bottomBorder)}>
            Som dere alle vet er det i dag mye usikkerhet rundt koronaviruset.
            Dette resulterer følgelig i usikkerhet rundt bryllupet. Heldigvis er
            det lenge til november og mye riktig kan skje før den tid. Vi vil
            uansett lytte til føringer og råd fra myndighetene og FHI. Det kan
            bety at arrangementer av vår størrelse er greit i november, eller
            det kan bety at vi må utsette til våren 2021. Uansett skal dere være
            trygge på at vi ikke vil utsette oss eller dere for noe myndighetene
            og FHI ikke mener er trygt. Vi har heldigvis luksusen av å kunne
            vente til etter sommeren før vi kommer med en endelig beslutning.
          </div>

          <div className={css.description}>
            Vi håper alle er friske, holder seg unna folk og vasker hendene!
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
