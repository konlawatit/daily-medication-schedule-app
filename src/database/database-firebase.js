//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();
import { delDB } from "./database-function";

import {
  changeMedicineState,
  changeTimeState,
  changeHistoryState
} from "./database-function";

export async function upLocalToFirebase2(firebase, uid) {
  try {
    db.transaction(
      (tx) => {
        const firestore = firebase.firestore()
        tx.executeSql(
          `SELECT *
              FROM FIREBASE`,
          [],
          (tx, results) => {
              if (results.rows.length > 0) {
          //   const uid = results.rows._array[0].uid;
  
            tx.executeSql(
              `SELECT *
                  FROM MEDICINE`,
              [],
              (tx, results) => {
                const medicine = results.rows._array;
                let payload = {
                  history: [],
                  medicine: []
                };
  
                medicine.forEach((data) => {
                  let medList = {
                    name: data.name,
                    note: data.note,
                    description: data.description,
                    iamge: data.image,
                    time: [],
                    history: []
                  };
                  console.log("local to firebase --->", data);
  
                  tx.executeSql(
                    `SELECT *
                          FROM TIME WHERE MEDICINE_id = ${data.id}`,
                    [],
                    (tx, results) => {
                      let timeList = results.rows._array;
                      timeList.forEach((time) => {
                        medList.time.push({
                          time: time.time,
                          isNoti: time.isNoti,
                          status: time.status,
                          day: time.day
                        });
                      });
  
                      tx.executeSql(
                        `SELECT *
                                FROM HISTORY WHERE MEDICINE_id = ${data.id}`,
                        [],
                        (tx, results) => {
                          let historyList = results.rows._array;
                          console.log("555555555555555", historyList);
                          historyList.forEach((history) => {
                            medList.history.push({
                              time: history.time,
                              date: history.date
                            });
                          });
  
                          payload.medicine.push(medList);
                          console.log('--------------med list---', medList)
                          let userRef = firestore
                            .collection("users")
                            .doc("uid");
                          userRef
                            .set({
                              history: [],
                              medicine: []
                            })
                            .then(() => {
                                console.log('updateeeeeeeeeeeeeeeeeeeeeeeee', medList)
                              userRef.update({
                                medicine:
                                  firebase.firestore.FieldValue.arrayUnion(
                                    medList
                                  )
                              });
                            });
  
                          console.log("history 1 -->", payload);
                        },
                        (_, err) => {
                          console.log("up local to firebase history", err);
                        }
                      );
                      console.log("medicine 1 -->", payload);
                    },
                    (_, err) => {
                      console.log("up local to firebase", err);
                    }
                  );
                });
  
                console.log("payload -->", payload);
              },
              (_, err) => {
                console.log("up local to firebase", err);
              }
            );
  
          }},
          (_, err) => {
            console.log("up local to firebase", err);
          }
        );
      },
      (err) => console.log("treacsactionn up local to firebase", err),
      () => {

      }
    );

  } catch (err) {
    console.log(err)
  }
}

export function upLocalToFirebase3(firebase, medicine234, navigation, dispatch, uid) {
  db.transaction(
    (tx) => {
      const firestore = firebase.firestore()
      tx.executeSql(
        `SELECT *
            FROM FIREBASE`,
        [],
        (tx, results) => {
            if (results.rows.length > 0) {
        //   const uid = results.rows._array[0].uid;

          tx.executeSql(
            `SELECT *
                FROM MEDICINE`,
            [],
            (tx, results) => {
              const medicine = results.rows._array;
              let payload = {
                history: [],
                medicine: []
              };

              medicine.forEach((data) => {
                let medList = {
                  name: data.name,
                  note: data.note,
                  description: data.description,
                  iamge: data.image,
                  time: [],
                  history: []
                };
                console.log("local to firebase --->", data);

                tx.executeSql(
                  `SELECT *
                        FROM TIME WHERE MEDICINE_id = ${data.id}`,
                  [],
                  (tx, results) => {
                    let timeList = results.rows._array;
                    timeList.forEach((time) => {
                      medList.time.push({
                        time: time.time,
                        isNoti: time.isNoti,
                        status: time.status,
                        day: time.day
                      });
                    });

                    tx.executeSql(
                      `SELECT *
                              FROM HISTORY WHERE MEDICINE_id = ${data.id}`,
                      [],
                      async (tx, results) => {
                        let historyList = results.rows._array;
                        console.log("555555555555555", historyList);
                        historyList.forEach((history) => {
                          medList.history.push({
                            time: history.time,
                            date: history.date
                          });
                        });

                        payload.medicine.push(medList);
                        console.log('--------------med list---', medList)
                        let userRef = firestore
                          .collection("users")
                          .doc(uid)
                        // userRef
                        //   .set({
                        //     history: [],
                        //     medicine: []
                        //   }).then(() => {
                            //   console.log('updateeeeeeeeeeeeeeeeeeeeeeeee', medList)
                            //   userRef.update({
                            //     medicine:
                            //       firebase.firestore.FieldValue.arrayUnion(
                            //         medList
                            //       )
                            //   });
                            // });

                        await userRef.update({
                          medicine:
                            firebase.firestore.FieldValue.arrayUnion(
                              medList
                            )
                        });

                          
                          

                        console.log("history 1 -->", payload);
                      },
                      (_, err) => {
                        console.log("up local to firebase history", err);
                      }
                    );
                    console.log("medicine 1 -->", payload);
                  },
                  (_, err) => {
                    console.log("up local to firebase", err);
                  }
                );
              })

              delDB();
              changeMedicineState(dispatch)
              changeTimeState(dispatch)
              setDataToLocal(medicine234, navigation, dispatch)


              console.log("payload -->", payload);
            },
            (_, err) => {
              console.log("up local to firebase", err);
            }
          );

        }},
        (_, err) => {
          console.log("up local to firebase", err);
        }
      );
    },
    (err) => console.log("treacsactionn up local to firebase", err),
    () => {
      
    }
  );
}

export async function setDataToLocal(payload, navigation, dispatch, uid) {
  try {
    db.transaction(
      (tx) => {

        payload.forEach((data) => {
          tx.executeSql(
            `INSERT INTO "MEDICINE" ("name","note","description","image") VALUES (?, ?, ?, ?)`,
            [data.name, data.note, data.description, data.image],
            (tx, results) => {
              console.log(
                "Insert Medicine------> firebase id",
                results.insertId
              );
              data.time.forEach((time) => {
                tx.executeSql(
                  `INSERT INTO "TIME" ("time","status","isNoti","day","MEDICINE_id") VALUES (?, ?, ?, ?, ?)`,
                  [
                    time.time,
                    time.status === true ? 1 : 0,
                    time.isNoti === true ? 1 : 0,
                    time.day,
                    results.insertId
                  ],
                  (tx, results) => {
                    console.log(
                      "Insert Time------> firebase id",
                      results.insertId
                    );
                  },
                  (tx, err) => {
                    console.log("err time firebase", err);
                  }
                );
              });

              data.history.forEach((history) => {
                console.log("history ------------>", history);
                tx.executeSql(
                  `INSERT INTO "HISTORY" ("date","time","MEDICINE_id") VALUES (?, ?, ?)`,
                  [history.date, history.time, results.insertId],
                  (tx, results) => {
                    console.log(
                      "Insert HISTORY------> firebase id",
                      results.insertId
                    );
                  },
                  (tx, err) => {
                    console.log("err HISTORY firebase", err);
                  }
                );
              });
            },
            (tx, err) => {
              console.log("err medicine firebase", err);
            }
          );
        });
        // history.forEach()
        changeMedicineState(dispatch, navigation);
        changeTimeState(dispatch, navigation);
        changeHistoryState(dispatch, navigation);
      },
      (err) => console.log("treacsactionn setDataToLocal", err),
      () => {
        navigation.navigate("Home");
      }
    );
  } catch (err) {
    console.log("try set data to local err", payload);
  }
}

export async function loginFirebase(
  payloadUser,
  payloadData,
  dispatch,
  navigation,
  state,
  firebase
) {
  try {
    if (state === "backup") {
      db.transaction(
        (tx) => {
          //   delDB();
          tx.executeSql(
            `SELECT *
                  FROM FIREBASE`,
            [],
            async (tx, results) => {
              if (results.rows.length < 1) {
                tx.executeSql(
                  `INSERT INTO "FIREBASE" ("uid", "email", "provider") VALUES ('${payloadUser.uid}', '${payloadUser.email}', '${payloadUser.provider}')`,
                  [],
                  (tx, results) => {
                    console.log("insert firebase success");
                  },
                  (tx, err) => {
                    console.log("insert firebase error", err);
                  }
                );
              } else {
                tx.executeSql(
                  `UPDATE FIREBASE SET uid='${payloadUser.uid}', email='${payloadUser.email}', provider='${payloadUser.provider}' WHERE id=1 `,
                  [],
                  (tx, results) => {
                    console.log("update firebase success");
                  },
                  (tx, err) => {
                    console.log("update firebase error", err);
                  }
                );
              }

              if (payloadData.medicine.length > 0) {
                console.log(
                  "select medicine ---------->",
                  payloadData.medicine
                );
                let medicine = payloadData.medicine;
                upLocalToFirebase3(firebase, medicine, navigation, dispatch, uid)
                // setDataToLocal(medicine, navigation, dispatch);
                // delDB()

              } else {
                upLocalToFirebase2(firebase, uid)
                changeMedicineState(dispatch, navigation);
                changeTimeState(dispatch, navigation);
                changeHistoryState(dispatch, navigation);
                navigation.navigate("Home");
              }

              // changeMedicineState(dispatch, navigation)
            },
            (_, err) => {
              console.log("select firebase error", err);
              return true;
            }
          );
        },
        (err) => console.log("treacsactionn", err),
        () => {}
      );
    } else {
      delDB().then(() => {
        db.transaction(
          (tx) => {
            //   delDB();
            tx.executeSql(
              `SELECT *
                    FROM FIREBASE`,
              [],
              async (tx, results) => {
                if (results.rows.length < 1) {
                  tx.executeSql(
                    `INSERT INTO "FIREBASE" ("uid", "email", "provider") VALUES ('${payloadUser.uid}', '${payloadUser.email}', '${payloadUser.provider}')`,
                    [],
                    (tx, results) => {
                      console.log("insert firebase success");
                    },
                    (tx, err) => {
                      console.log("insert firebase error", err);
                    }
                  );
                } else {
                  tx.executeSql(
                    `UPDATE FIREBASE SET uid='${payloadUser.uid}', email='${payloadUser.email}', provider='${payloadUser.provider}' WHERE id=1 `,
                    [],
                    (tx, results) => {
                      console.log("update firebase success");
                    },
                    (tx, err) => {
                      console.log("update firebase error", err);
                    }
                  );
                }
  
                console.log("222222->", payloadData);
  
                if (payloadData.medicine.length > 0) {
                  console.log(
                    "select medicine ---------->",
                    payloadData.medicine
                  );
                  let medicine = payloadData.medicine;
                  setDataToLocal(medicine, navigation, dispatch, payloadUser.uid);
                } else {
                  navigation.navigate("Home");
                  changeMedicineState(dispatch, navigation);
                  changeTimeState(dispatch, navigation);
                  changeHistoryState(dispatch, navigation);
                }
  
                // changeMedicineState(dispatch, navigation)
              },
              (_, err) => {
                console.log("select firebase error", err);
                return true;
              }
            );
          },
          (err) => console.log("treacsactionn", err),
          () => {}
        );
      });
    }

  } catch (err) {
    console.log("login firebase err", err);
  }
}
