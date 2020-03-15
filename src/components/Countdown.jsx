import React from "react";
import css from "./countdown.less";

const getTime = () => {
  const bryllupsTime = new Date("07 Nov 2020 11:30:00 GMT");
  const today = new Date();

  const seconds = (bryllupsTime - today) / 1000;

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds / 3600) % 24),
    minutes: Math.floor((seconds / 60) % 60)
  };
};

const Countdown = () => {
  const { days, hours, minutes } = getTime();

  return (
    <div className={css.container}>
      {days > 0 && (
        <>
          {days}
          <span>d</span>
        </>
      )}

      {(hours > 0 || days > 0) && (
        <>
          {hours}
          <span>t</span>
        </>
      )}

      {(minutes > 0 || hours > 0 || days > 0) && (
        <>
          {minutes}
          <span>m</span>
        </>
      )}
    </div>
  );
};

export default Countdown;
