export default class Add {

    constructor(wrapper, linkedTable, linkedDB) {
        this.wrapper = wrapper;
        this.linkedTable = linkedTable;
        this.linkedDB = linkedDB;
        this.form = this.wrapper.querySelector(".add__form");
        this.inputs = this.form.querySelectorAll(".add__input");
        this.data = {};
        this.init();
    }

    init() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.collectFormData();
            this.linkedDB.addRow(
                `
                    ${this.data.order_id},
                    "${this.data.order_date}",
                    "${this.data.supplier_name}",
                    ${this.data.warehouse_id},
                    "${this.data.product_name}",
                    ${this.data.quantity},
                    ${this.data.sum}
                `, () => {
                    this.linkedTable.addRow(this.data);
                    this.form.reset();
                });

        })
    }

    collectFormData() {
        this.inputs.forEach(input => {
            if (input.getAttribute("type") === "date") {
                this.data[input.getAttribute("name")] = new Date(input.value).toLocaleDateString();
            } else {
                this.data[input.getAttribute("name")] = input.value.trim().toLowerCase();
            }
        });
    }
}