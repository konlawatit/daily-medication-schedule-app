import { setMedicine, setTime } from "../store/actions/medicineAction";


//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();

export async function updateVerify(isNoti, id) {
  db.transaction(tx => {
    tx.executeSql(`UPDATE MEDICINE SET isNoti = ${isNoti ? 1 : 0} WHERE id = ${id} `,
    [],
    (tx, results) => {
      console.log('update success')
    },
    (tx, err) => {
      console.log('update verify error', err)
    })
  })
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
      `INSERT INTO TIME ("time","status","day","MEDICINE_id") VALUES ('12:00',0,'{"mo": 0,"tu": 1,"we": 0,"th":1,"fr":0,"sa":1,"su":0}',1),
      ('13:00',0,'{"mo": 1,"tu": 1,"we": 1,"th":1,"fr":1,"sa":1,"su":1}',1),
      ('13:00',0,'{"mo": 1,"tu": 1,"we": 1,"th":1,"fr":1,"sa":1,"su":1}',2)`,
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
        dispatch(setMedicine(results.rows._array))
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
        let result = results.rows._array
        let newArray = result.map((data) => {
          return {...data, day: JSON.parse(data.day)}
        })
        console.log(newArray);
        
        // dispatch(setTime(newArray))
        dispatch(setTime(newArray))
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
          console.log(JSON.stringify(results.rows._array));
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
          console.log(JSON.stringify(results.rows._array));
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
          console.log(JSON.stringify(results.rows._array));
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
