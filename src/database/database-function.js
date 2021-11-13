import { setMedicine } from "../store/actions/medicineAction";


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
      `CREATE TABLE IF NOT EXISTS MEDICINE (
        "id"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL,
        "note"	TEXT,
        "description"	INTEGER,
        "notiTime"	TEXT,
        "isNoti"	INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`,
      [],
      (tx, results) => {
        console.log("create MEDICINE table successfully");
      },
      (error) => console.log("craete table error", error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS MEDICINE (
        "id"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL,
        "note"	TEXT,
        "description"	INTEGER,
        "notiTime"	TEXT,
        "isNoti"	INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`,
      [],
      (tx, results) => {
        console.log("create MEDICINE table successfully");
      },
      (error) => console.log("craete table error", error)
    );

    tx.executeSql(
      `INSERT INTO MEDICINE ("name","note","description","notiTime","isNoti") VALUES ("ยาแก้ปวด1","ไม่มี","Module parse failed: Unexpected token (10:22)","12:00",1),
      ("ยาแก้ปวด2","ไม่มี","Module parse failed: Unexpected token (10:22)","21:00",0),
      ("ยาแก้ปวด3","ไม่มี","Module parse failed: Unexpected token (10:22)","18:00",1)`,
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
      `SELECT * FROM MEDICINE`,
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
  });
}

export function delDB() {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE MEDICINE;",
      [],
      (tx, results) => {
        if (results && results.rows && results.rows._array) {
          /* do something with the items */
          // results.rows._array holds all the results.
          console.log(JSON.stringify(results.rows._array));
          console.log("table dropped");
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
