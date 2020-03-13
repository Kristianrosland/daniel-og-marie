import React, { useState, useEffect } from "react";
import RSVP from "./RSVP";

import * as firebase from "firebase/app";
require("firebase/firestore");

let db;
let docRef;
let auth;

export const SavingState = {
  NOT_ASKED: "not-asked",
  LOADING: "loading",
  FAILED: "failed",
  SUCCESS: "success"
};

const RSVPDataWrapper = ({ refProp }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [names, setNames] = useState([]);
  const [attending, setAttending] = useState([]);
  const [allergies, setAllergies] = useState("");

  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loadingState, setLoadingState] = useState({
    user: false,
    data: false
  });
  const [savingState, setSavingState] = useState(SavingState.NOT_ASKED);

  useEffect(() => {
    if (!db) {
      db = firebase.firestore();
      docRef = db.collection("data");
    }

    if (!auth) {
      auth = firebase.auth();
      firebase.auth().onAuthStateChanged(user => {
        setLoadingState(prev => ({ ...prev, user: false }));

        setUser(user);
        setUsername(getEmailFromUser(user));
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLoadingState(prev => ({ ...prev, data: true }));
      const invitationCode = auth.currentUser.email.slice(0, 5).toUpperCase();

      docRef.doc(invitationCode).onSnapshot(
        doc => {
          const data = doc.data();
          setNames(data.names ? data.names : []);
          setAttending(data.attending ? data.attending : []);
          setAllergies(data.allergies ? data.allergies : "");
          setLoadingState(prev => ({ ...prev, data: false }));
          setEditing(!data.responded);
        },
        () => {
          setLoadingState(prev => ({ ...prev, data: false }));
          setError("En feil har oppstått!");
        }
      );
    }
  }, [user]);

  const updateAttending = name => {
    if (!username || !name) return null;

    const updatedAttending = attending.includes(name)
      ? attending.filter(n => n !== name)
      : [...attending, name];

    setAttending(updatedAttending);
  };

  const save = async () => {
    setSavingState(SavingState.LOADING);

    await new Promise(r => setTimeout(r, 1000));

    if (username) {
      await db
        .collection("data")
        .doc(username)
        .set({
          responded: true,
          names: typeof names === "object" ? names : names,
          attending: typeof attending === "object" ? attending : attending,
          allergies: typeof allergies === "string" ? allergies : allergies
        });
      setSavingState(SavingState.SUCCESS);
      setEditing(false);
    } else {
      setSavingState(SavingState.FAILED);
    }
  };

  const login = async (username, done) => {
    const email = `${username}@marieogdaniel.no`;
    const password = `000-${username}`;

    setLoadingState({ ...loadingState, user: true });

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setLoadingState({ ...loadingState, user: false });
    } catch (err) {
      setError("Ugyldig invitasjonskode");
      setLoadingState({ ...loadingState, user: false });
    } finally {
      done();
    }
  };

  const guests = names.map(name => ({
    name,
    attending: attending.includes(name)
  }));

  return (
    <RSVP
      refProp={refProp}
      loggedIn={user !== null}
      loading={loadingState.user || loadingState.data}
      updateAttending={updateAttending}
      clearAttending={() => setAttending([])}
      guests={guests}
      allergies={allergies}
      updateAllergies={setAllergies}
      login={login}
      error={error}
      signOut={() => auth.signOut()}
      save={save}
      savingState={savingState}
      editing={editing}
      setEditing={val => {
        if (val) {
          setSavingState(SavingState.NOT_ASKED);
        }
        setEditing(val);
      }}
    />
  );
};

const getEmailFromUser = user => {
  return user && user.email && user.email.length >= 5
    ? user.email.slice(0, 5).toUpperCase()
    : "";
};

export default RSVPDataWrapper;
