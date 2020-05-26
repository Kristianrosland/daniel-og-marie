import React from "react";
import myra from "../images/myra.svg";
import kristian from "../images/kristian.png";
import css from "./forlovere.less";

const Forlovere = () => {
  return (
    <div className={css.container}>
      <div className={css.forloverContainer}>
        <div>
          <div className={css.header}>Våre kjære forlovere!</div>
          Brudens forlovere er hennes gode veninner{" "}
          <a
            href={"https://www.facebook.com/marie.nesheim?ref=br_rs"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Marie
          </a>{" "}
          og{" "}
          <a
            href={"https://www.facebook.com/hholte1?ref=br_rs"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Heidi
          </a>
          . Trioen ble dannet på NTNU og har holdt sammen siden første skoledag
          i Trondheim. De tok opptakskravet (Myra) til studentforeningen sammen,
          og har i ettertid alltid kalt seg «Team Myra». Trioen har bodd sammen,
          reist på turer og funnet på mye artig sprell. Takk for at dere er her
          <span className={css.heart}>{"<3"}</span>
        </div>
        <img src={myra} alt="Forloverne til Marie" />
      </div>

      <div className={css.forloverContainer}>
        <div>
          Brudgommens forlover er bror og kompis{" "}
          <a
            href={"https://www.facebook.com/kristianrosland1.0?ref=br_rs"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Kristian
          </a>
          . De to har alltid delt interesser, hobbier, venner og verdier. Sammen
          har de drevet med alt fra krabbefangst og hyttebygging til
          dataspilling, problemløsing og programmering. Det er nevneverdig at
          Kristian har programmert lesende nettside.
          <br />
          <br />
          En storebror som dirigerer og en lillebror som gjør som han blir
          fortalt - sammen er de effektive, målbeviste og mer enn dobbelt så
          gode. Det finnes ikke mange som oss, som blinker feil i trafikken med
          vilje for å skape bedre og mer effektiv flyt.
        </div>
        <div className={css.bestManLine}>
          Du er fullferdig tittelen som{" "}
          <span className={css.bestMan}>BEST MAN!</span>
        </div>
        <img
          src={kristian}
          alt="Forloveren til Daniel"
          className={css.kristianImg}
        />
      </div>
    </div>
  );
};

export default Forlovere;
