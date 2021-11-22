//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();
import { delDB } from "./database-function";

import { changeMedicineState, changeTimeState, changeHistoryState } from "./database-function";

export async function setDataToLocal(payload, navigation, dispatch) {
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
                console.log('history ------------>', history)
                tx.executeSql(
                  `INSERT INTO "HISTORY" ("date","time","MEDICINE_id") VALUES (?, ?, ?)`,
                  [
                    history.date,
                    history.time,
                    results.insertId
                  ],
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
        changeHistoryState(dispatch, navigation)
        
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
  navigation
) {
  try {
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

              console.log('222222->',payloadData)

              if (payloadData.medicine.length > 0) {
                console.log('select medicine ---------->', payloadData.medicine)
                let medicine = payloadData.medicine;
                setDataToLocal(medicine, navigation, dispatch);
              }

              navigation.navigate("Home")
              changeMedicineState(dispatch, navigation);
              changeTimeState(dispatch, navigation);
              changeHistoryState(dispatch, navigation)

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
  } catch (err) {
    console.log("login firebase err", err);
  }
}
