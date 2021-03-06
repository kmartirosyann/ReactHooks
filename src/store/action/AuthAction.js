export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getstate, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getstate, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            male: newUser.male,
            female: newUser.female,
            other: newUser.other,
            birthday:newUser.birthday,
            photoURL:newUser.photoURL
            
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
     
  };
};


// export const chat = newUser => {
//   return (dispatch, getstate, { getFirebase, getFirestore }) => {
//     const firebase = getFirebase();
//     const firestore = getFirestore();
//     firebase.database().ref().child('messages')
//     .then((res)=>{
//       return firestore.collection('users')
//     .doc(res.user.uid)
//     .get({
//       firstName: newUser.firstName,
//       lastName: newUser.lastName,
//       initials: newUser.firstName[0] + newUser.lastName[0]
//     })
//     })
//     .then(() => {
//       dispatch({ type: "MESSAGE_SUCCESS" });
//     })
//     .catch(err => {
//       dispatch({ type: "MESSAGE_ERROR", err });
//     });
//   }
// }
