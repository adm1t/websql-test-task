import Database from './components/database.js';
import Table from './components/table.js';
import Filter from './components/filter.js';
import Add from './components/add.js';
import Feature from './components/feature.js';

document.addEventListener("DOMContentLoaded", () => {
    const db = new Database();
    const table = new Table(document.querySelector(".table__tbody"));
    const filter = new Filter(document.querySelector(".filter"), table);
    const add = new Add(document.querySelector(".add"), table, db);
    const feature = new Feature(document.querySelector(".feature"), table, db);

    fetch('https://mockend.com/adm1t/test/posts?limit=20')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                db.addRow(`
                    ${item.id},
                    "${new Date(item.order_date).toLocaleDateString()}",
                    "${item.supplier_name}",
                    ${item.warehouse_id},
                    "${item.product_name}",
                    ${item.quantity},
                    ${item.sum}
                `, () => {
                    let itemCopy = Object.assign({}, item);
                    itemCopy.order_id = itemCopy.id;
                    itemCopy.order_date = new Date(itemCopy.order_date).toLocaleDateString();
                    table.addRow(itemCopy);
                });
            });
        });

});