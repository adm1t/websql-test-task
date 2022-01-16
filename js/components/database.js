export default class Database {

    constructor() {
        this.db = openDatabase("MainDB", "0.1", "База данных", 200000);
        this.createTable();
    }

    createTable(callback) {
        this.db.transaction((tx) => {
                tx.executeSql('DROP TABLE IF EXISTS data');
                tx.executeSql(`
                    CREATE TABLE data 
                    (
                        order_id INT UNIQUE,
                        order_date DATE,
                        supplier_name TEXT,
                        warehouse_id INT,
                        product_name TEXT,
                        quantity INT,
                        sum INT
                    )
                `, [])
            },
            err => console.error("error: ", err),
        );
    }

    addRow(values, callback) {
        this.db.transaction((tx) => {
                tx.executeSql(`
                    INSERT INTO data
                    VALUES (${values})
                `, [])
            },
            err => {
                console.error("error: ", err);
                alert("Ошибка при добавлении новой записи ...");
            },
            tx => {
                if (callback) callback();
            }
        );
    }

    deleteRow(orderId, callback) {
        this.db.transaction((tx) => {
                tx.executeSql(`
                    DELETE FROM data
                    WHERE order_id = ${orderId}
                `, [])
            },
            err => {
                console.error("error: ", err);
                alert("Ошибка при удалении записи ...");
            },
            tx => {
                if (callback) callback();
            }
        );
    }

    updateCell(orderId, cellName, newValue, callback) {
        this.db.transaction((tx) => {
                tx.executeSql(`
                    UPDATE data
                    SET ${cellName} = "${newValue}"
                    WHERE order_id = ${orderId}
                `, [])
            },
            err => {
                console.error("error: ", err);
                alert("Ошибка при обновлении записи ...");
            },
            tx => {
                if (callback) callback();
            }
        );
    }

    getData(callback) {
        this.db.transaction((tx) => {
                tx.executeSql("SELECT * FROM data", [], (tx, result) => {
                    this.dataObj = result.rows;
                }, null)
            },
            err => {
                console.error("error: ", err);
                alert("Ошибка при получении списка записей ...");
            },
            tx => {
                if (callback) callback();
            }
        );
    }
}