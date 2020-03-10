import React, { useState, useEffect } from "react";
import RSVP from "./RSVP";
import debounce from "lodash.debounce";

import * as firebase from "firebase/app";
require("firebase/firestore");

let db;
let docRef;
let auth;
let debouncedFn;

const RSVPDataWrapper = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [names, setNames] = useState([]);
  const [attending, setAttending] = useState([]);
  const [allergies, setAllergies] = useState("");

  const [error, setError] = useState(null);
  const [loadingState, setLoadingState] = useState({
    user: false,
    data: false
  });

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

    updateFirebase({ attending: updatedAttending });
    setAttending(updatedAttending);
  };

  const updateFirebase = updated => {
    db.collection("data")
      .doc(username)
      .set({
        attending:
          typeof updated.attending === "object" ? updated.attending : attending,
        names: typeof updated.names === "object" ? updated.names : names,
        allergies:
          typeof updated.allergies === "string" ? updated.allergies : allergies
      });
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

  const debouncedUpdateAllergies = event => {
    event.persist();

    if (!debouncedFn) {
      debouncedFn = debounce(() => {
        updateFirebase({ allergies: event.target.value });
      }, 1000);
    }

    setAllergies(event.target.value);
    debouncedFn();
  };

  const guests = names.map(name => ({
    name,
    attending: attending.includes(name)
  }));

  return (
    <RSVP
      loggedIn={user !== null}
      loading={loadingState.user || loadingState.data}
      updateAttending={updateAttending}
      clearAttending={() => updateFirebase({ attending: [] })}
      guests={guests}
      allergies={allergies}
      updateAllergies={debouncedUpdateAllergies}
      login={login}
      error={error}
      signOut={() => auth.signOut()}
    />
  );
};

const getEmailFromUser = user => {
  return user && user.email && user.email.length >= 5
    ? user.email.slice(0, 5).toUpperCase()
    : "";
};

export default RSVPDataWrapper;
