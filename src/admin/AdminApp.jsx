import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import classNames from "classnames";
import Login from "./Login";

import checkmark from "../icons/checkmark.svg";
import cross from "../icons/cross.svg";
import openEnvelope from "../icons/open-envelope.svg";
import closedEnvelope from "../icons/closed-envelope.svg";
import css from "./admin-app.less";

import * as firebase from "firebase/app";
require("firebase/firestore");

let db;
let auth;

const FILTERS = {
  UNOPENED: "unopened",
  OPENED: "opened"
};

const AdminApp = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [invites, setInvites] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);
  const [seeAllergies, setSeeAllergies] = useState(false);

  useEffect(() => {
    if (!db) {
      db = firebase.firestore().collection("data");
    }

    if (!auth) {
      auth = firebase.auth();
      firebase.auth().onAuthStateChanged(user => {
        const email =
          user && user.email ? user.email.slice(0, 5).toUpperCase() : "";
        if (email !== "ADMIN") {
          auth.signOut();
          setLoading(false);
        }

        setUser(user);
        setLoading(false);
        window.scrollTo(0, 0);
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      db.get().then(snapshot => {
        snapshot.forEach(doc => {
          setInvites(oldInvites => ({ ...oldInvites, [doc.id]: doc.data() }));
        });
      });
    }
  }, [user]);

  const login = async (username, password) => {
    setLoading(true);

    try {
      await firebase.auth().signInWithEmailAndPassword(username, password);
      setLoading(false);
    } catch (err) {
      setError("Feil brukernavn/passord");
      setLoading(false);
    }
  };

  const RSVPs =
    Object.keys(invites).length > 0
      ? Object.entries(invites).map(([invCode, response]) => ({
          invitationCode: invCode,
          ...response
        }))
      : [];

  let filteredRSVPs =
    search.length > 0
      ? RSVPs.filter(
          r =>
            r.names.some(name =>
              name.toLowerCase().includes(search.toLowerCase())
            ) || r.invitationCode.toLowerCase().startsWith(search.toLowerCase())
        )
      : RSVPs;

  if (filter) {
    if (filter === FILTERS.UNOPENED) {
      filteredRSVPs = filteredRSVPs.filter(r => !r.responded);
    } else if (filter === FILTERS.OPENED) {
      filteredRSVPs = filteredRSVPs.filter(r => r.responded);
    }
  }

  return (
    <div className={css.app}>
      {loading ? (
        <div className={css.loader}>
          <DotLoader size={60} color={"#ffbc6b"} />
        </div>
      ) : !user ? (
        <>
          <Login login={login} error={error} />
        </>
      ) : (
        <div className={css.container}>
          <div className={css.list}>
            <div className={css.statsContainer}>
              <StatsBox
                title="Invitasjoner"
                current={RSVPs ? RSVPs.filter(r => r.responded).length : 0}
                total={RSVPs ? RSVPs.length : 0}
              />

              <StatsBox
                title="Gjester"
                current={
                  RSVPs && RSVPs.length > 0
                    ? RSVPs.reduce(
                        (acc, r) =>
                          r.attending ? r.attending.length + acc : acc,
                        0
                      )
                    : 0
                }
                total={
                  RSVPs && RSVPs.length > 0
                    ? RSVPs.reduce(
                        (acc, r) => (r.names ? acc + r.names.length : acc),
                        0
                      )
                    : 0
                }
              />
            </div>
            <form className={css.filters}>
              <input
                type="checkbox"
                checked={filter === FILTERS.OPENED}
                onChange={() => {}}
              />
              <span
                onClick={() =>
                  setFilter(filter === FILTERS.OPENED ? null : FILTERS.OPENED)
                }
              >
                Åpna
              </span>
              <input
                type="checkbox"
                checked={filter === FILTERS.UNOPENED}
                onChange={() => {}}
              />
              <span
                onClick={() =>
                  setFilter(
                    filter === FILTERS.UNOPENED ? null : FILTERS.UNOPENED
                  )
                }
              >
                Uåpna
              </span>
            </form>

            <form className={css.filters}>
              <input
                type="checkbox"
                checked={seeAllergies}
                onChange={() => {}}
              />
              <span onClick={() => setSeeAllergies(!seeAllergies)}>
                Se allergier
              </span>
            </form>

            {seeAllergies ? (
              <div className={css.allergiesList}>
                {filteredRSVPs
                  .filter(r => r.allergies && r.allergies.length > 0)
                  .map(rsvp => (
                    <div className={css.allergy}>
                      {rsvp.names.join(", ")}
                      <div>{rsvp.allergies}</div>
                    </div>
                  ))}
              </div>
            ) : (
              <>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className={css.searchInput}
                  placeholder="Søk på navn eller kode.."
                />
                {filteredRSVPs.map(rsvp => (
                  <RSVPListItem key={rsvp.invitationCode} rsvp={rsvp} />
                ))}
              </>
            )}
            <button
              className={css.signOut}
              onClick={() => firebase.auth().signOut()}
            >
              Logg ut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RSVPListItem = ({ rsvp: response }) => {
  return (
    <div className={css.listItem}>
      <div className={css.invCode}>#{response.invitationCode}</div>
      <div className={css.namesListAndIcon}>
        <div className={css.namesList}>
          {response.names.map(name => {
            const icon = !response.responded
              ? null
              : response.attending.includes(name)
              ? checkmark
              : cross;

            return (
              <div
                key={name}
                className={classNames(css.name, {
                  [css.strikeThrough]:
                    response.responded && !response.attending.includes(name)
                })}
              >
                {icon && <img src={icon} alt="" />}
                {name}
              </div>
            );
          })}
        </div>
        <div className={css.statusIcon}>
          <img
            src={response.responded ? openEnvelope : closedEnvelope}
            alt="ikon"
          />
        </div>
      </div>
    </div>
  );
};

const StatsBox = ({ title, current, total }) => {
  return (
    <div className={css.statsBox}>
      <div className={css.statsHeader}>{title}</div>
      <div className={css.statsRow}>
        <div>{current}</div> / <div>{total}</div>
      </div>
    </div>
  );
};

export default AdminApp;
