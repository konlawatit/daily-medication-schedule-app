import {
  setMedicine,
  setTime,
  selectMedicine,
  stackDeleteTime
} from "../store/actions/medicineAction";

//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();

export async function updateVerify(status, id) {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE TIME SET status = 0 WHERE id = ${id} `,
      [],
      (tx, results) => {
        console.log("update success");
      },
      (tx, err) => {
        console.log("update verify error", err);
      }
    );
  });
}

export function updateIsNoti(status, id, dispatch) {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE TIME SET isNoti = ${status === true ? 1 : 0 } WHERE id = ${id} `,
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
              return { ...data, day: JSON.parse(data.day), isNoti: data.isNoti === 1 ? true : false };
            });

            // dispatch(setTime(newArray))
            console.log('select time', results.rows._array)
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
              return { ...data, day: JSON.parse(data.day), isNoti: data.isNoti === 1 ? true : false };
            });

            // dispatch(setTime(newArray))
            console.log('select time', results.rows._array)
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
        `INSERT INTO "TIME" ("time","status","day","MEDICINE_id") VALUES (?, ?, ?, ?)`,
        [payload.time, payload.status, day, payload.id],
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
                return { ...data, day: JSON.parse(data.day), isNoti: data.isNoti === 1 ? true : false };
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
            return { ...data, day: JSON.parse(data.day), isNoti: data.isNoti === 1 ? true : false };
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
            return { ...data, day: JSON.parse(data.day), isNoti: data.isNoti === 1 ? true : false };
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
        "name"	TEXT NOT NULL,
        "date"	TEXT NOT NULL,
        "time"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
      )`,
      [],
      (tx, results) => {
        console.log("create HISTORY table successfully");
      },
      (error) => console.log("craete table error", error)
    );

    tx.executeSql(
      `INSERT INTO "MEDICINE" ("name","note","description","image") VALUES ('ยาแก้ปวด','ไม่มี','Module parse failed: Unexpected token (10:22)',NULL),
      ('ยานอนหลับ','กิน1เม็ด','กินนิดเดียว',NULL)`,
      [],
      (tx, results) => {
        console.log("Insert medicine");
      },
      (_, err) => {
        console.log("insert medicine error", err);
        return true;
      }
    );

    tx.executeSql(
      `INSERT INTO TIME ("time","status", "isNoti","day","MEDICINE_id") VALUES ('12:00',0,1,'{"mo": 0,"tu": 1,"we": 0,"th":1,"fr":0,"sa":1,"su":0}',1),
      ('13:00',0,1,'{"mo": 1,"tu": 1,"we": 1,"th":1,"fr":1,"sa":1,"su":1}',1),
      ('13:00',0,1,'{"mo": 1,"tu": 1,"we": 1,"th":1,"fr":1,"sa":1,"su":1}',2)`,
      [],
      (tx, results) => {
        console.log("Insert TIME");
      },
      (_, err) => {
        console.log("insert TIME error", err);
        return true;
      }
    );

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

export function delDB() {
  db.transaction((tx) => {
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
