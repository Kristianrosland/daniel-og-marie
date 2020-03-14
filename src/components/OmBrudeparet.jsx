import React from "react";
import bunad from "../images/om-brudeparet/bunad.png";
import klatring from "../images/om-brudeparet/klatring.png";
import riddere from "../images/om-brudeparet/riddere.png";
import solbriller from "../images/om-brudeparet/solbriller.png";
import css from "./om-brudeparet.less";

const OmBrudeparet = ({ refProp }) => {
  return (
    <div ref={refProp} className={css.container}>
      <div className={css.textContainer}>
        <div className={css.header}>
          Marie <span>og</span> Daniel
        </div>
        <div className={css.text}>
          sin historie begynte høsten 2014, da Marie begynte på
          Petroleumsstudiet på NTNU. Lite visste de at de 6 år senere skulle bli
          mann og kone. Vennskap oppsto da begge to valgte å dra med seks andre
          på utveksling i Australia. Marie dro med en venninne og Daniel dro med
          fem kompiser - «The Norwegians».
          <br />
          <br />
          Kjærlighet oppsto ikke før ett år senere, når Marie bestemte seg for å
          sikre seg Daniel før studietiden var over. Bestemt og målrettet som
          Marie er, var det ikke annet for Daniel å gjøre enn å hoppe på toget i
          full fart. Siden har de hengt sammen i tykt og tynt. Marie og Daniel
          er nå en veldefinert duo som ifølge deres nærmeste allerede bærer preg
          av å ha vært gift i mange år. Kanskje er vi en smule kjedelige da vi
          foretrekker ost og vinsmaking over fest og fyll? Maries jernhånd og
          Daniels tålmodighet er kanskje oppskriften bak det lykkelige
          forholdet?
          <br />
          <br />
          Voksenlivet har for lengst startet for duoen som nå bor i Harstad.
          Jobb, hus og bil er allerede på plass. Neste steg for det
          tradisjonelle paret må dermed være ekteskap og bryllup. Duoen ser frem
          til å feire dagen med både familie og venner fra hele landet - Nord,
          Sør, Øst og Vest.
        </div>
      </div>
      <div className={css.viGlederOss}>Vi gleder oss!</div>

      <div className={css.imageContainer}>
        <div className={css.imageContainerColumn}>
          <img src={bunad} alt="" className={css.bunad} />
          <img src={riddere} alt="" className={css.riddere} />
        </div>

        <div className={css.imageContainerColumn}>
          <img src={solbriller} alt="" className={css.solbriller} />
          <img src={klatring} alt="" className={css.klatring} />
        </div>
      </div>
    </div>
  );
};

export default OmBrudeparet;
