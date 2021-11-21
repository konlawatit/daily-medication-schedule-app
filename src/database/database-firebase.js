//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();
import { delDB } from "./database-function";

import { changeMedicineState, changeTimeState } from "./database-function";

async function formatTime(time) {
  try {
    let ls = [];
    let countResult = 0;
    let values = "";

    time.forEach((data) => {
      ls.push(data.time);
      ls.push(0);
      ls.push(1);
      countResult += 1;
      if (countResult !== 1) {
        values += ",(?, ?, ?, ?, ?)";
      }
      ls.push(data.day);
      ls.push(1);
    });
    return { data: ls, values };
  } catch (err) {
    console.log("format time err", err);
  }
}

async function formatMedicine(medicine) {
  try {
    let ls = [];
    let countResult = 0;
    let values = "";

    medicine.forEach((data) => {
      countResult += 1;
      if (countResult !== 1) {
        values += ",(?, ?, ?, ?, ?)";
      }
      ls.push(data.name);
      ls.push(data.note);
      ls.push(data.description);
      ls.push(data.image);
    });
    return { data: ls, values };
  } catch (err) {
    console.log("format medicine err", err);
  }
}

export async function setDataToLocal(payload,navigation, dispatch) {
    try {
        db.transaction(
          (tx) => {
            payload.forEach((data) => {
                console.log('data result', data)
              tx.executeSql(
                `INSERT INTO "MEDICINE" ("name","note","description","image") VALUES (?, ?, ?, ?)`,
                [data.name, data.note, data.description, data.image],
                (tx, results) => {
                  console.log("Insert Medicine------> firebase id", results.insertId);
                  data.time.forEach(time => {
                    tx.executeSql(
                        `INSERT INTO "TIME" ("time","status","isNoti","day","MEDICINE_id") VALUES (?, ?, ?, ?, ?)`,
                        [time.time, time.status, time.isNoti, time.day, results.insertId],
                        (tx, results) => {
                          console.log("Insert Time------> firebase id", results.insertId);
                        },
                        (tx, err) => {
                          console.log("err time firebase", err);
                        }
                      );
                  })
                },
                (tx, err) => {
                  console.log("err medicine firebase", err);
                }
              );
            })
            changeMedicineState(dispatch, navigation)
            changeTimeState(dispatch, navigation)
          },
          (err) => console.log("treacsactionn setDataToLocal", err),
          () => {
              
              navigation.navigate("Home")
          }
        );
    } catch(err) {
        console.log('try set data to local err', payload)
    }
}

export async function loginFirebase(payloadUser, payloadData, dispatch, navigation) {
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
          
                    let medicine = payloadData.medicine;
          
                    setDataToLocal(medicine, navigation,dispatch)
          
          
                    //   tx.executeSql(
                    //     `INSERT INTO "MEDICINE" ("name","note","description","image") VALUES (?, ?, ?, ?)${newArrMedicine.values}`,
                    //     newArrMedicine.data,
                    //     (tx, results) => {
                    //       console.log("Insert Medicine---------------------------> firebase");
                    //     },
                    //     (tx, err) => {
                    //       console.log("err medicine firebase", err);
                    //     }
                    //   );
          
                    //   tx.executeSql(
                    //     `INSERT INTO "TIME" ("time","status","isNoti","day","MEDICINE_id") VALUES (?, ?, ?, ?, ?)${newArrTime.values}`,
                    //     newArrTime.data,
                    //     (tx, results) => {
                    //       console.log("Insert Time---------------------------> firebase", results);
                    //       tx.executeSql(
                    //         `SELECT *
                    //         FROM TIME`,
                    //         [],
                    //         (tx, results) => {
                    //           console.log("select Tinme 2", results.rows._array);
                    //         //   dispatch(setMedicine(results.rows._array));
          
                    //         },
                    //         (_, err) => {
                    //           console.log("inserttime error", err);
                    //           return true;
                    //         }
                    //       );
          
                    //       tx.executeSql(
                    //         `SELECT *
                    //         FROM MEDICINE`,
                    //         [],
                    //         (tx, results) => {
                    //           console.log("select MEDICINE 2", results.rows._array);
                    //         //   dispatch(setMedicine(results.rows._array));
          
                    //         },
                    //         (_, err) => {
                    //           console.log("inserttime error", err);
                    //           return true;
                    //         }
                    //       );
          
                    //       changeTimeState(dispatch);
                    //     },
                    //     (tx, err) => {
                    //       console.log("err time firebase", err);
                    //     }
                    //   );

                    changeMedicineState(dispatch, navigation)
          
                    
                  },
                  (_, err) => {
                    console.log("select firebase error", err);
                    return true;
                  }
                );
              },
              (err) => console.log("treacsactionn", err),
              () => {
              
              }
            );
        })

    } catch(err) {
        console.log('login firebase err', err)
    }
}
