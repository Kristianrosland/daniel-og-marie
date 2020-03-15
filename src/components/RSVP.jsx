import React, { useState } from "react";
import { SavingState } from "./RSVPDataWrapper";
import classNames from "classnames";
import elv from "../images/elv.png";
import arrow from "../icons/arrow.png";
import chevron from "../icons/right-chevron.svg";
import checkmark from "../icons/checkmark.svg";
import cross from "../icons/cross.svg";
import editIcon from "../icons/edit.svg";
import closeCross from "../icons/yellow-cross.svg";
import css from "./rsvp.less";

const RSVP = ({
  refProp,
  loggedIn,
  loading,
  updateAttending,
  clearAttending,
  guests,
  allergies,
  updateAllergies,
  login,
  error,
  signOut,
  save,
  savingState,
  editing,
  setEditing
}) => {
  const [code, setCode] = useState("");
  const [cannotAttend, setCannotAttend] = useState(false);

  const onChange = async e => {
    const newCode = e.target.value.toUpperCase();

    if (newCode.length <= 5) {
      setCode(newCode);

      if (newCode.length === 5) {
        await login(newCode, () => {
          setCode("");
          if (refProp && refProp.current) {
            const currentY = window.pageYOffset;
            window.scrollTo(
              0,
              Math.min(currentY, refProp.current.offsetTop - 15)
            );
          }
        });
      }
    }
  };

  return (
    <div className={css.outerContainer} ref={refProp}>
      <div className={css.rsvpAndImageContainer}>
        <div
          className={classNames(css.rsvpContainer, {
            [css.expanded]: loggedIn
          })}
        >
          <div className={css.header}>RSVP</div>
          {loggedIn ? (
            <div className={css.loggedInContainer}>
              <div className={css.formContainer}>
                <div className={css.form}>
                  <div className={css.formHeader}>
                    {editing ? "Hvem kommer?" : "Disse kommer"}
                  </div>
                  {guests.map(({ name, attending }) =>
                    editing ? (
                      <GuestCheckboxWithLabel
                        key={name}
                        label={name}
                        checked={attending}
                        onChange={() => {
                          updateAttending(name);
                          setCannotAttend(false);
                        }}
                        style={
                          guests.length >= 4 ? { marginTop: "0.7rem" } : {}
                        }
                      />
                    ) : (
                      <AttendingListItem
                        key={name}
                        name={name}
                        attending={attending}
                        style={
                          guests.length >= 4 ? { marginTop: "0.7rem" } : {}
                        }
                      />
                    )
                  )}
                  {editing && (
                    <GuestCheckboxWithLabel
                      label={"Kan dessverre ikke komme"}
                      checked={cannotAttend}
                      onChange={() => {
                        clearAttending();
                        setCannotAttend(true);
                      }}
                      style={guests.length >= 4 ? { marginTop: "0.7rem" } : {}}
                    />
                  )}
                </div>
                <div className={css.form}>
                  <div className={css.menu}>
                    <MenuEntry header={"Forrett"} course={"Kveite ceviche"} />
                    <MenuEntry
                      header={"Hovedrett"}
                      course={"Entrecote av jærkalv"}
                    />
                    <MenuEntry header={"Dessert"} course={"Peanøtt mousse"} />
                  </div>
                </div>
              </div>
              {editing ? (
                <textarea
                  value={allergies}
                  onChange={event => updateAllergies(event.target.value)}
                  className={classNames(css.allergiesInput)}
                  placeholder="Skriv ned allergier her.."
                  onFocus={e => (e.target.placeholder = "")}
                  onBlur={e =>
                    (e.target.placeholder = "Skriv ned allergier her..")
                  }
                  required={true}
                />
              ) : (
                <div style={{ marginBottom: "auto" }}>
                  <div className={css.allergiesHeader}>Allergier</div>
                  <div className={css.allergiesText}>
                    {allergies.length > 0 ? allergies : "Ingen"}
                  </div>
                </div>
              )}

              <SaveButton
                onClick={editing ? save : () => setEditing(true)}
                savingState={savingState}
                edit={!editing}
              />

              {!editing && (
                <img
                  src={closeCross}
                  alt="Close-button"
                  className={css.closeButton}
                  onClick={signOut}
                />
              )}
            </div>
          ) : (
            <>
              <div className={css.description}>
                <div>
                  Håper at du har anledning til å være med på feiringen av dagen
                  vår
                </div>
                <div>
                  Fortell oss om du kan komme eller ikke ved å taste inn din
                  unike kode fra innbydelsen
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
        {!loggedIn && (
          <>
            <img src={arrow} alt="" className={css.arrow} />
            <div className={css.upsell}>Gi beskjed her</div>
          </>
        )}
        <img
          src={elv}
          alt="Daniel og Marie ved kanal"
          className={classNames(css.elvImage)}
        />
      </div>
    </div>
  );
};

const GuestCheckboxWithLabel = ({ label, checked, onChange, style }) => (
  <div
    key={label}
    className={css.attendingCheckboxAndLabel}
    onClick={() => onChange(label)}
    style={style}
  >
    <div
      className={classNames(css.attendingCheckbox, {
        [css.checked]: checked
      })}
    />
    {label}
  </div>
);

const MenuEntry = ({ header, course }) => (
  <div className={css.menuEntry}>
    <div className={css.courseHeader}>{header}</div>
    <div className={css.courseDescription}>{course}</div>
  </div>
);

const SaveButton = ({ onClick, savingState, edit }) => {
  const label = edit
    ? "Endre"
    : savingState === SavingState.LOADING
    ? "Lagrer.."
    : savingState === SavingState.SUCCESS
    ? "Lagret"
    : "Lagre";

  const icon = edit
    ? editIcon
    : savingState === SavingState.SUCCESS
    ? checkmark
    : savingState === SavingState.NOT_ASKED
    ? chevron
    : null;

  return (
    <button onClick={onClick} className={css.saveButton}>
      {label}
      {icon && <img src={icon} alt="" />}
    </button>
  );
};

const AttendingListItem = ({ name, attending }) => (
  <div className={css.attendingListItem}>
    <img src={attending ? checkmark : cross} alt="" />
    {name}
  </div>
);

export default RSVP;
