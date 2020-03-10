import React, { useState } from "react";
import classNames from "classnames";
import elv from "../images/elv.png";
import arrow from "../icons/arrow.png";
import css from "./rsvp.less";

const RSVP = ({
  loggedIn,
  loading,
  updateAttending,
  clearAttending,
  guests,
  allergies,
  updateAllergies,
  login,
  error,
  signOut
}) => {
  const [code, setCode] = useState("");
  const [cannotAttend, setCannotAttend] = useState(false);

  const onChange = async e => {
    const newCode = e.target.value.toUpperCase();

    if (newCode.length <= 5) {
      setCode(newCode);

      if (newCode.length === 5) {
        login(newCode, () => setCode(""));
      }
    }
  };

  return (
    <div className={css.outerContainer}>
      <div
        className={classNames(css.container, {
          [css.expanded]: loggedIn
        })}
      >
        <div className={css.header}>RSVP</div>
        {loggedIn ? (
          <div className={css.loggedInContainer}>
            <div className={css.formContainer}>
              <div className={css.form}>
                <div className={css.formHeader}>Hvem kommer?</div>
                {guests.map(({ name, attending }) => (
                  <GuestCheckboxWithLabel
                    key={name}
                    label={name}
                    checked={attending}
                    onChange={() => {
                      updateAttending(name);
                      setCannotAttend(false);
                    }}
                  />
                ))}
                <GuestCheckboxWithLabel
                  label={"Kan dessverre ikke komme"}
                  checked={cannotAttend}
                  onChange={() => {
                    clearAttending();
                    setCannotAttend(true);
                  }}
                />
              </div>
              <div className={css.form}>
                <div className={css.menu}>
                  <MenuEntry
                    header={"Forrett"}
                    course={"Kveite ceviche"}
                    signOut={signOut}
                  />
                  <MenuEntry
                    header={"Hovedrett"}
                    course={"Entrecote av jærkalv"}
                    signOut={signOut}
                  />
                  <MenuEntry
                    header={"Dessert"}
                    course={"Peanøtt mousse"}
                    signOut={signOut}
                  />
                </div>
              </div>
            </div>
            <input
              value={allergies}
              onChange={event => updateAllergies(event)}
              className={classNames(css.inputField, css.allergiesInput)}
              placeholder="Skriv ned allergier her.."
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Skriv ned allergier her..")}
              required={true}
            />
          </div>
        ) : (
          <>
            <div className={css.description}>
              <div>
                Håper at du har anledning til å være med på feiringen av dagen
                vår
              </div>
              <div>
                Fortell oss om du kan komme eller ikke ved å taste inn din unike
                kode fra innbydelsen
              </div>
            </div>
            <div className={css.inputAndErrorContainer}>
              <input
                value={code}
                onChange={onChange}
                className={css.inputField}
                placeholder="Skriv kode.."
                onFocus={e => (e.target.placeholder = "")}
                onBlur={e => (e.target.placeholder = "Skriv kode..")}
                disabled={loading}
                required={true}
              />
              {error && <div className={css.error}>{error}</div>}
            </div>
          </>
        )}
      </div>
      <img src={arrow} alt="" className={css.arrow} />
      <div className={css.upsell}>Gi beskjed her</div>
      <img
        src={elv}
        alt="Daniel og Marie ved kanal"
        className={classNames(css.elvImage)}
      />
    </div>
  );
};

const GuestCheckboxWithLabel = ({ label, checked, onChange }) => (
  <div
    key={label}
    className={css.attendingCheckboxAndLabel}
    onClick={() => onChange(label)}
  >
    <div
      className={classNames(css.attendingCheckbox, {
        [css.checked]: checked
      })}
    />
    {label}
  </div>
);

const MenuEntry = ({ header, course, signOut }) => (
  <div className={css.menuEntry} onClick={signOut}>
    <div className={css.courseHeader}>{header}</div>
    <div className={css.courseDescription}>{course}</div>
  </div>
);

export default RSVP;
