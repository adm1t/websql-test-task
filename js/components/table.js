export default class TableView {

    constructor(tbody) {
        this.tbody = tbody;
    }

    addRow(rowData) {
        let rowHtml = `
            <tr class="table__row" data-order-id="${rowData.order_id}">
                <td class="table__cell" data-cell-name="order_id">${rowData.order_id}</td>
                <td class="table__cell" data-cell-name="order_date">${rowData.order_date}</td>
                <td class="table__cell" data-cell-name="supplier_name">${rowData.supplier_name}</td>
                <td class="table__cell" data-cell-name="warehouse_id">${rowData.warehouse_id}</td>
                <td class="table__cell" data-cell-name="product_name">${rowData.product_name}</td>
                <td class="table__cell" data-cell-name="quantity">${rowData.quantity}</td>
                <td class="table__cell" data-cell-name="sum">${rowData.sum}</td>
            </tr>
        `;

        this.tbody.insertAdjacentHTML('beforeend', rowHtml);
    }

    removeRow(orderId) {
        let row = this.tbody.querySelector(`.table__row[data-order-id="${orderId}"]`);
        row.remove();
    }

    updateCell(orderId, cellName, newValue) {
        let cell = this.tbody.querySelector(`.table__row[data-order-id="${orderId}"] .table__cell[data-cell-name="${cellName}"]`);
        cell.removeAttribute("data-tmp-value");
        cell.innerHTML = newValue;
    }

    filter(filterData) {
        let tableRows = this.tbody.querySelectorAll(".table__row");
        tableRows.forEach(row => {
            let isShouldBeHidden = false;
            if (filterData) {
                let rowCells = row.querySelectorAll(".table__cell");
                Array.from(rowCells).some(cell => {
                    let cellName = cell.getAttribute("data-cell-name");
                    let cellValue = cell.innerHTML.trim().toLowerCase();
                    if (cellValue.indexOf(filterData[cellName]) === -1) isShouldBeHidden = true;
                });
            };
            if (isShouldBeHidden) {
                row.classList.add("table__row--hidden");
            } else {
                row.classList.remove("table__row--hidden");
            }
        });
    }
}