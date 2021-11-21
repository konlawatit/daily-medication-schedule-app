import { firebase } from "../../firebase";

//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();

export function upLocalToFirebase() {
  const firestore = firebase.firestore();
  db.transaction(
    (tx) => {
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
                          .doc("Mx4dra711kadIj2C9oIfUl3wKEC3");
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
                    // push firebase
                    // let userRef = firestore.collection('users').doc()
                    // payload.medicine.push(medList);
                    // let userRef = firestore
                    //   .collection("users")
                    //   .doc("Mx4dra711kadIj2C9oIfUl3wKEC3");
                    // userRef
                    //   .set({
                    //     history: [],
                    //     medicine: []
                    //   })
                    //   .then(() => {
                    //     userRef.update({
                    //       medicine:
                    //         firebase.firestore.FieldValue.arrayUnion(medList)
                    //     });
                    //   });

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

          tx.executeSql(
            `SELECT *
          FROM HISTORY`,
            [],
            (tx, results) => {},
            (tx, err) => {
              console.log("up to firebase ", err);
            }
          );
        }},
        (_, err) => {
          console.log("up local to firebase", err);
        }
      );
    },
    (err) => console.log("treacsactionn up local to firebase", err),
    () => {}
  );
}
