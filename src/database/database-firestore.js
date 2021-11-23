import { firebase } from "../../firebase";

//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const uploadImage = async (uid, uri, name) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  let ref = firebase.storage().ref().child(`images/${uid}/${name}`)
  return ref.put(blob)
}

//เซฟทัพ
export function upLocalToFirebase(uid) {
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
              console.log('medicine select save to firestore --->', medicine)
              let payload = {
                history: [],
                medicine: []
              };

              medicine.forEach(async (data) => {
                let image = ''
                if (data.image !== "") {
                  image = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
                  // uploadImage(uid, data.image, image)
                }
                //  else {
                //   im
                // }
                console.log('iamge namemmmm ', image)


                let medList = {
                  name: data.name,
                  note: data.note,
                  description: data.description,
                  image: data.image,
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
                          .doc(uid);
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
    () => {}
  );
}
