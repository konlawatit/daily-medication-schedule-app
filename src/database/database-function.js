import {
  setMedicine,
  setTime,
  selectMedicine,
  stackDeleteTime,
  setHistory,
} from "../store/actions/medicineAction";
// import { firebase } from "../../firebase";

//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();

// export function upLocalToFirebase() {
//   const firestore = firebase.firestore();
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         `SELECT *
//             FROM FIREBASE`,
//         [],
//         (tx, results) => {
//             const row2 = results.rows._array;
//             console.log('111111111111',row2[0].uid)
//           tx.executeSql(
//             `SELECT *
//                 FROM MEDICINE`,
//             [],
//             (tx, results) => {
//               const medicine = results.rows._array;
//               let payload = {
//                 history: [],
//                 medicine: []
//               };

//               medicine.forEach((data) => {
//                 let medList = {
//                   name: data.name,
//                   note: data.note,
//                   description: data.description,
//                   iamge: data.image,
//                   time: []
//                 };
//                 console.log("local to firebase --->", data);

//                 tx.executeSql(
//                   `SELECT *
//                         FROM TIME WHERE MEDICINE_id = ${data.id}`,
//                   [],
//                   (tx, results) => {
//                     let timeList = results.rows._array;
//                     timeList.forEach((time) => {
//                       medList.time.push({
//                         time: time.time,
//                         isNoti: time.isNoti,
//                         status: time.status,
//                         day: time.day
//                       });
//                     });
//                     // push firebase
//                     // let userRef = firestore.collection('users').doc()
//                     payload.medicine.push(medList);
//                     console.log('medicine 1 -->', payload)
//                   },
//                   (_, err) => {
//                     console.log("up local to firebase", err);
//                   }
//                 );
//               });

//               console.log('payload -->', payload);
//             },
//             (_, err) => {
//               console.log("up local to firebase", err);
//             }
//           );
//         },
//         (_, err) => {
//           console.log("up local to firebase", err);
//         }
//       );
//     },
//     (err) => console.log("treacsactionn up local to firebase", err),
//     () => {}
//   );
// }

export function changeHistoryState(dispatch) {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM HISTORY INNER JOIN MEDICINE ON MEDICINE.id = HISTORY.MEDICINE_id`,
      [],
      (tx, results) => {
        let result = results.rows._array;
        
        // dispatch(setTime(newArray))
        console.log("select history", result);
        dispatch(setHistory(result));
      },
      (_, err) => {
        console.log("insert history error", err);
        return true;
      }
    );
  }, err => console.log('transaction change history state' ,err),
  () => {
  })
}

export async function changeMedicineState(dispatch) {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT *
        FROM MEDICINE`,
        [],
        (tx, results) => {
          console.log("select medicine success");
          dispatch(setMedicine(results.rows._array));
          
        },
        (_, err) => {
          console.log("insert medicine error", err);
          return true;
        }
      );
    }, err => console.log('transaction change medicin state' ,err),
    () => {

    })
  } catch(err) {
    console.log('change medicn state', err)
  }
}

export function changeTimeState(dispatch) {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT *
      FROM MEDICINE
      INNER JOIN TIME
      ON MEDICINE.id = TIME.MEDICINE_id`,
      [],
      (tx, results) => {
        let result = results.rows._array;
        let newArray = result.map((data) => {
          return {
            ...data,
            day: JSON.parse(data.day),
            isNoti: data.isNoti === 1 ? true : false
          };
        });
  
        // dispatch(setTime(newArray))
        console.log("select time", results.rows._array);
        dispatch(setTime(newArray));
      },
      (_, err) => {
        console.log("insert time error", err);
        return true;
      }
    );
  }, err => console.log('transaction change time state' ,err),
  () => {
  })
}

export async function updateVerify(status, id, dispatch,idMed) {
  var fulldate = new Date()
  var date = fulldate.getDate().toString()+"/"+(fulldate.getMonth()+1).toString()+"/"+fulldate.getFullYear().toString()
  var time = (fulldate.getHours()<10?'0':'')+fulldate.getHours().toString()+":"+(fulldate.getMinutes()<10?'0':'')+fulldate.getMinutes().toString()
  console.log(fulldate)
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO "HISTORY"("date","time","MEDICINE_id") VALUES (?,?, ?)`,
      [date,time,idMed],
      (tx, results) => {    
        tx.executeSql(
          `SELECT *
          FROM HISTORY
          INNER JOIN MEDICINE
          ON MEDICINE.id = HISTORY.MEDICINE_id`,
          [],
          (tx, results) => {
            let result = results.rows._array;
            let newArray = result.map((data) => {
              return {
                ...data,
              };
            });
            dispatch(setHistory(newArray));
          },
          (_, err) => {
            return true;
          }
        );
      },
      (tx, err) => {
      },
    );
    tx.executeSql(
      `UPDATE TIME SET status = ${status?1:0} WHERE id = ${id} `,
      [],
      (tx, results) => {
        console.log("update success");
        
        tx.executeSql(
          `SELECT *
          FROM MEDICINE
          INNER JOIN TIME
          ON MEDICINE.id = TIME.MEDICINE_id`,
          [],
          (tx, results) => {
            let result = results.rows._array;
            let newArray = result.map((data) => {
              return {
                ...data,
                day: JSON.parse(data.day),
                isNoti: data.isNoti === 1 ? true : false
              };
            });

            // dispatch(setTime(newArray))
            console.log("select time", results.rows._array);
            dispatch(setTime(newArray));
          },
          (_, err) => {
            console.log("insert time error", err);
            return true;
          }
        );
        
      },
      (tx, err) => {
        console.log("update verify error", err);
      },
    );

  });
}


export function updateIsNoti(status, id, dispatch) {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE TIME SET isNoti = ${status === true ? 1 : 0} WHERE id = ${id} `,
      [],
      (tx, results) => {
        console.log("update isNoti success");
        tx.executeSql(
          `SELECT *
          FROM MEDICINE
          INNER JOIN TIME
          ON MEDICINE.id = TIME.MEDICINE_id`,
          [],
          (tx, results) => {
            let result = results.rows._array;
            let newArray = result.map((data) => {
              return {
                ...data,
                day: JSON.parse(data.day),
                isNoti: data.isNoti === 1 ? true : false
              };
            });

            // dispatch(setTime(newArray))
            console.log("select time", results.rows._array);
            dispatch(setTime(newArray));
          },
          (_, err) => {
            console.log("insert time error", err);
            return true;
          }
        );
      },
      (tx, err) => {
        console.log("update isNoti error", err);
      }
    );
  });
}


export function updateTime(payload, dispatch) {
  db.transaction(
    (tx) => {
      console.log(11111111, payload);
      let day = `{"fr": ${payload.day.fr},"mo": ${payload.day.mo},"sa": ${payload.day.sa},"su": ${payload.day.su},"th": ${payload.day.th},"tu": ${payload.day.tu},"we": ${payload.day.we}}`;

      tx.executeSql(
        `DELETE FROM TIME where id=${payload.timeId}`,
        [
        ],
        (tx, results) => {
          console.log("del medicine success->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        },
        (_, err) => {
          console.log("del medicine error", err);
          return true;
        }
      );

      tx.executeSql(
        `INSERT INTO "TIME" ("time","status", "isNoti","day","MEDICINE_id") VALUES (?,?, ?, ?, ?)`,
        [payload.time, payload.status, payload.isNoti, day, payload.id],
        (tx, results) => {
          console.log("Insert TIME success");
          tx.executeSql(
            `SELECT *
            FROM MEDICINE
            INNER JOIN TIME
            ON MEDICINE.id = TIME.MEDICINE_id`,
            [],
            (tx, results) => {
              let result = results.rows._array;
              let newArray = result.map((data) => {
                return {
                  ...data,
                  day: JSON.parse(data.day),
                  isNoti: data.isNoti === 1 ? true : false
                };
              });

              // dispatch(setTime(newArray))
              dispatch(setTime(newArray));
            },
            (_, err) => {
              console.log("insert time error", err);
              return true;
            }
          );
        },
        (_, err) => {
          console.log("insert medicine error", err);
          return true;
        }
      );
    },
    (err) => console.log(err)
  );
}

export async function getDailyMedicine() {
  let result;
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM MEDICINE`,
      [],
      (tx, results) => {
        console.log(1111, results.rows._array);
        result = results.rows._array;
      },
      (tx, err) => {
        console.log("insert medicine error", err);
        result = false;
      }
    );
    // return [1, 2];
  });
}

function convertTimeList() {
  let ls = [];
  let countResult = 0;
  let values = "";

  resultsSetId.forEach((data) => {
    ls.push(data.time);
    ls.push(0);
    if (data.day) {
      countResult += 1;
      if (countResult !== 1) {
        values += ",(?, ?, ?, ?)";
      }
      ls.push(
        `{"fr": ${data.day.fr},"mo": ${data.day.mo},"sa": ${data.day.sa},"su": ${data.day.su},"th": ${data.day.th},"tu": ${data.day.tu},"we": ${data.day.we}}`
      );
    }
    ls.push(data.MEDICINE_id);
  });
}


export async function addMedicine(
  name,
  note,
  description,
  timeList,
  image,
  dispatch
) {
  await db.transaction(async (tx) => {
    let setId = timeList;
    let resultsSetId;
    let te;
    note = note ? note : "";
    description = description ? description : "";
    tx.executeSql(
      `INSERT INTO "MEDICINE" ("name","note","description","image") VALUES ('${name}','${note}','${description}','${image}')`,
      [],
      (tx, results) => {
        console.log("Insert medicine", results.insertId);

        resultsSetId = setId.map((data) => {
          return { ...data, MEDICINE_id: results.insertId };
        });
        te = results.insertId;

        let ls = [];
        let countResult = 0;
        let values = "";

        resultsSetId.forEach((data) => {
          ls.push(data.time);
          ls.push(0);
          ls.push(1);
          if (data.day) {
            countResult += 1;
            if (countResult !== 1) {
              values += ",(?, ?, ?, ?, ?)";
            }
            ls.push(
              `{"fr": ${data.day.fr},"mo": ${data.day.mo},"sa": ${data.day.sa},"su": ${data.day.su},"th": ${data.day.th},"tu": ${data.day.tu},"we": ${data.day.we}}`
            );
          }
          ls.push(data.MEDICINE_id);
        });

        tx.executeSql(
          `INSERT INTO "TIME" ("time","status","isNoti","day","MEDICINE_id") VALUES (?, ?, ?, ?, ?)${values}`,
          ls,
          (tx, results) => {
            console.log("Insert Time---------------------------");
          },
          (tx, err) => {
            console.log("err time", err);
          }
        );

        tx.executeSql(
          `SELECT *
          FROM MEDICINE
          INNER JOIN TIME
          ON MEDICINE.id = TIME.MEDICINE_id`,
          [],
          (tx, results) => {
            let result = results.rows._array;
            let newArray = result.map((data) => {
              return {
                ...data,
                day: JSON.parse(data.day),
                isNoti: data.isNoti === 1 ? true : false
              };
            });

            // dispatch(setTime(newArray))
            console.log("select time", results.rows._array);
            dispatch(setTime(newArray));
          },
          (_, err) => {
            console.log("insert time error", err);
            return true;
          }
        );
      },
      (_, err) => {
        console.log("insert medicine error", err);
        return true;
      }
    );

    tx.executeSql(
      `SELECT *
      FROM MEDICINE`,
      [],
      (tx, results) => {
        dispatch(setMedicine(results.rows._array));
      },
      (_, err) => {
        console.log("insert medicine error", err);
        return true;
      }
    );
  });
}

export function addTime(payload, dispatch) {
  db.transaction(
    (tx) => {
      console.log(11111111, payload);
      let day = `{"fr": ${payload.day.fr},"mo": ${payload.day.mo},"sa": ${payload.day.sa},"su": ${payload.day.su},"th": ${payload.day.th},"tu": ${payload.day.tu},"we": ${payload.day.we}}`;


      tx.executeSql(
        `INSERT INTO "TIME" ("time","status", "isNoti","day","MEDICINE_id") VALUES (?,?, ?, ?, ?)`,
        [payload.time, payload.status, payload.isNoti, day, payload.id],
        (tx, results) => {
          console.log("Insert TIME success");
          tx.executeSql(
            `SELECT *
            FROM MEDICINE
            INNER JOIN TIME
            ON MEDICINE.id = TIME.MEDICINE_id`,
            [],
            (tx, results) => {
              let result = results.rows._array;
              let newArray = result.map((data) => {
                return {
                  ...data,
                  day: JSON.parse(data.day),
                  isNoti: data.isNoti === 1 ? true : false
                };
              });

              // dispatch(setTime(newArray))
              dispatch(setTime(newArray));
            },
            (_, err) => {
              console.log("insert time error", err);
              return true;
            }
          );
        },
        (_, err) => {
          console.log("insert medicine error", err);
          return true;
        }
      );
    },
    (err) => console.log(err)
  );
}

export function updateMedicine(payload, dispatch) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `UPDATE MEDICINE SET name=?, note=?, description=?, image=? WHERE id=? `,
        [
          payload.name,
          payload.note,
          payload.description,
          payload.image,
          payload.id
        ],
        (tx, results) => {
          console.log("update medicine success");
        },
        (_, err) => {
          console.log("update medicine error", err);
          return true;
        }
      );

      tx.executeSql(
        `SELECT *
        FROM MEDICINE`,
        [],
        (tx, results) => {
          // console.log(results.rows);
          console.log("select medicne success");
          dispatch(setMedicine(results.rows._array));
          dispatch(selectMedicine(payload.id));
        },
        (_, err) => {
          console.log("select medicine error", err);
          return true;
        }
      );
    },
    (err) => console.log(err)
  );
}

export function deleteMedicine(id, dispatch) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `DELETE FROM MEDICINE where id=${id}`,
        [],
        (tx, results) => {
          console.log("delete MEDICINE success");
        },
        (_, err) => {
          console.log("delete MEDICINE error", err);
          return true;
        }
      );

      tx.executeSql(
        `DELETE FROM TIME where MEDICINE_id=${id}`,
        [],
        (tx, results) => {
          console.log("delete time success");
        },
        (_, err) => {
          console.log("delete time error", err);
          return true;
        }
      );

      tx.executeSql(
        `SELECT *
        FROM MEDICINE`,
        [],
        (tx, results) => {
          // console.log(results.rows);
          dispatch(setMedicine(results.rows._array));
        },
        (_, err) => {
          console.log("select medicine error", err);
          return true;
        }
      );

      tx.executeSql(
        `SELECT *
        FROM MEDICINE
        INNER JOIN TIME
        ON MEDICINE.id = TIME.MEDICINE_id`,
        [],
        (tx, results) => {
          let result = results.rows._array;
          let newArray = result.map((data) => {
            return {
              ...data,
              day: JSON.parse(data.day),
              isNoti: data.isNoti === 1 ? true : false
            };
          });

          // dispatch(setTime(newArray))
          dispatch(setTime(newArray));
        },
        (_, err) => {
          console.log("select time error", err);
          return true;
        }
      );
    },
    (err) => console.log(err)
  );
}

export function deleteTime(payload, dispatch) {
  let text = "";
  payload.forEach((data) => {
    if (payload[0].id == data.id) {
      text += `${data.id}`;
    } else {
      text += `,${data.id}`;
    }
  });

  db.transaction(
    (tx) => {
      tx.executeSql(
        `DELETE FROM TIME where id in (${text})`,
        [],
        (tx, results) => {
          console.log("delete time success");
        },
        (_, err) => {
          console.log("delete time error", err);
          return true;
        }
      );

      tx.executeSql(
        `SELECT *
        FROM MEDICINE
        INNER JOIN TIME
        ON MEDICINE.id = TIME.MEDICINE_id`,
        [],
        (tx, results) => {
          let result = results.rows._array;
          let newArray = result.map((data) => {
            return {
              ...data,
              day: JSON.parse(data.day),
              isNoti: data.isNoti === 1 ? true : false
            };
          });

          // dispatch(setTime(newArray))
          dispatch(setTime(newArray));
        },
        (_, err) => {
          console.log("insert time error", err);
          return true;
        }
      );
    },
    (err) => console.log(err)
  );
}

export function initDB(dispatch) {
  db.transaction((tx) => {
    // tx.executeSql("DROP TABLE USERS", []);

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "FIREBASE" (
        "id" INTEGER NOT NULL,
        "uid"	TEXT,
        "email"	TEXT,
        "provider" TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
      );`,
      [],
      (tx, results) => {
        console.log("create FIREBASE table successfully");
      },
      (error) => console.log("craete FIREBASE table error", error)
    );


    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "MEDICINE" (
        "id"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL,
        "note"	TEXT,
        "description"	INTEGER,
        "image"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
      );`,
      [],
      (tx, results) => {
        console.log("create MEDICINE table successfully");
      },
      (error) => console.log("craete MEDICINE table error", error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "TIME" (
        "id"	INTEGER,
        "time"	TEXT NOT NULL,
        "status"	INTEGER NOT NULL,
        "day"	TEXT NOT NULL,
        "isNoti" INTEGER NOT NULL,
        "MEDICINE_id"	INTEGER,
        FOREIGN KEY("MEDICINE_id") REFERENCES "medicine"("id"),
        PRIMARY KEY("id" AUTOINCREMENT)
      )`,
      [],
      (tx, results) => {
        console.log("create TIME table successfully");
      },
      (error) => console.log("craete TIME table error", error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "HISTORY" (
        "id"	INTEGER,
        "date"	TEXT NOT NULL,
        "time"	TEXT NOT NULL,
        "MEDICINE_id"	INTEGER,
        FOREIGN KEY("MEDICINE_id") REFERENCES "medicine"("id"),
        PRIMARY KEY("id" AUTOINCREMENT)
      )`,
      [],
      (tx, results) => {
        console.log("create HISTORY table successfully");
      },
      (error) => console.log("craete table error", error)
    );

    // tx.executeSql(
    //   `INSERT INTO "MEDICINE" ("name","note","description","image") VALUES ('ยาแก้ปวด','ไม่มี','Module parse failed: Unexpected token (10:22)',NULL),
    //   ('ยานอนหลับ','กิน1เม็ด','กินนิดเดียว',NULL)`,
    //   [],
    //   (tx, results) => {
    //     console.log("Insert medicine");
    //   },
    //   (_, err) => {
    //     console.log("insert medicine error", err);
    //     return true;
    //   }
    // );

    
    // tx.executeSql(
    //   `INSERT INTO "HISTORY" ("date","time","MEDICINE_id") VALUES ('21/11/2021','13:00',1),
    //   ('21/11/2021','14:00',2)`,
    //   [],
    //   (tx, results) => {
    //     console.log("Insert History");
    //   },
    //   (_, err) => {
    //     console.log("insert History error", err);
    //     return true;
    //   }
    // );

    // tx.executeSql(
    //   `INSERT INTO TIME ("time","status", "isNoti","day","MEDICINE_id") VALUES ('12:00',0,1,'{"mo": 0,"tu": 1,"we": 0,"th":1,"fr":0,"sa":1,"su":0}',1),
    //   ('13:00',0,1,'{"mo": 1,"tu": 1,"we": 1,"th":1,"fr":1,"sa":1,"su":1}',1),
    //   ('13:00',0,1,'{"mo": 1,"tu": 1,"we": 1,"th":1,"fr":1,"sa":1,"su":1}',2)`,
    //   [],
    //   (tx, results) => {
    //     console.log("Insert TIME");
    //   },
    //   (_, err) => {
    //     console.log("insert TIME error", err);
    //     return true;
    //   }
    // );

    tx.executeSql(
      `SELECT *
      FROM MEDICINE`,
      [],
      (tx, results) => {
        console.log(results.rows);
        dispatch(setMedicine(results.rows._array));
      },
      (_, err) => {
        console.log("insert medicine error", err);
        return true;
      }
    );

    tx.executeSql(
      `SELECT *
      FROM HISTORY       INNER JOIN MEDICINE
      ON MEDICINE.id = HISTORY.MEDICINE_id`,
      [],
      (tx, results) => {
        console.log(results.rows);
        dispatch(setHistory(results.rows._array));
      },
      (_, err) => {
        console.log("select history error", err);
        return true;
      }
    );

    tx.executeSql(
      `SELECT *
      FROM MEDICINE
      INNER JOIN TIME
      ON MEDICINE.id = TIME.MEDICINE_id`,
      [],
      (tx, results) => {
        let result = results.rows._array;
        let newArray = result.map((data) => {
          return { ...data, day: JSON.parse(data.day) };
        });

        // dispatch(setTime(newArray))
        dispatch(setTime(newArray));
      },
      (_, err) => {
        console.log("insert time error", err);
        return true;
      }
    );

    // tx.executeSql(
    //   `SELECT * FROM TIME`,
    //   [],
    //   (tx, results) => {
    //     console.log(results.rows);
    //     dispatch(setMedicine(results.rows._array))
    //   },
    //   (_, err) => {
    //     console.log("insert medicine error", err);
    //     return true;
    //   }
    // );
  });
}

export function dropDB() {
  db.transaction((tx) => {

    tx.executeSql(
      "DROP TABLE FIREBASE;",
      [],
      (tx, results) => {
        if (results && results.rows && results.rows._array) {
          /* do something with the items */
          // results.rows._array holds all the results.
          console.log("FIREBASE table dropped");
        } else {
          console.log("no results");
        }
      },
      (tx, error) => {
        console.log(error);
      }
    );

    tx.executeSql(
      "DROP TABLE TIME;",
      [],
      (tx, results) => {
        if (results && results.rows && results.rows._array) {
          /* do something with the items */
          // results.rows._array holds all the results.
          console.log("TIME table dropped");
        } else {
          console.log("no results");
        }
      },
      (tx, error) => {
        console.log(error);
      }
    );

    tx.executeSql(
      "DROP TABLE MEDICINE;",
      [],
      (tx, results) => {
        if (results && results.rows && results.rows._array) {
          /* do something with the items */
          // results.rows._array holds all the results.
          console.log("MEDICINE table dropped");
        } else {
          console.log("no results");
        }
      },
      (tx, error) => {
        console.log(error);
      }
    );

    tx.executeSql(
      "DROP TABLE HISTORY;",
      [],
      (tx, results) => {
        if (results && results.rows && results.rows._array) {
          /* do something with the items */
          // results.rows._array holds all the results.
          console.log("HISTORY table dropped");
        } else {
          console.log("no results");
        }
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
}

export async function delDB() {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM MEDICINE",
        [],
        (tx, results) => {
          console.log('delete medicine')
        },
        (tx, error) => {
          console.log('delete medicien', error);
        }
      );
  
      tx.executeSql(
        "DELETE FROM TIME",
        [],
        (tx, results) => {
          console.log('delete time')
        },
        (tx, error) => {
          console.log('delete time', error);
        }
      );
  
      tx.executeSql(
        "DELETE FROM HISTORY",
        [],
        (tx, results) => {
          console.log('delete history')
        },
        (tx, error) => {
          console.log('delete history', error);
        }
      );
    },
    (err) => console.log(err));
  } catch (err) {
    console.log('del db err', err)
  }
}

export async function delFirebase(dispatch) {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM FIREBASE",
        [],
        (tx, results) => {
          console.log('delete medicine')
        },
        (tx, error) => {
          console.log('delete medicien', error);
        }
      );
    },
    (err) => console.log(err));
  } catch (err) {
    console.log('del db err', err)
  }
}
