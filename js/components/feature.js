export default class Feature {

    constructor(wrapper, linkedTable, linkedDB) {
        this.wrapper = wrapper;
        this.linkedTable = linkedTable;
        this.linkedDB = linkedDB;
        this.removeBtn = this.wrapper.querySelector(".feature__btn--remove");
        this.editBtn = this.wrapper.querySelector(".feature__btn--edit");
        this.printBtn = this.wrapper.querySelector(".feature__btn--print");
        this.closeBtn = this.wrapper.querySelector(".feature__btn--close");
        this.init();
    }

    init() {
        this.setUserMode("view");

        this.printBtn.addEventListener("click", () => {
            window.print();
        });

        this.removeBtn.addEventListener("click", () => {
            this.setUserMode("remove");
        })

        this.editBtn.addEventListener("click", () => {
            this.setUserMode("edit");
        })

        this.closeBtn.addEventListener("click", () => {
            this.setUserMode("view");
            if (this.currentCell) this.undoEdit();
        })

        // remove handler
        document.addEventListener("click", (e) => {
            if (this.userMode === "remove" && e.target.closest(".table__row")) {
                let isConfirm = confirm("Подтвердите удаление выбранной записи");
                if (isConfirm) {
                    let orderId = e.target.closest(".table__row").getAttribute("data-order-id");
                    this.linkedDB.deleteRow(orderId, () => {
                        this.linkedTable.removeRow(orderId);
                    })
                }
            }
        })

        //edit handler
        document.addEventListener("click", (e) => {
            if (this.userMode === "edit" && e.target.classList.contains("table__cell")) {
                this.setUserMode("edit-active");
                this.currentCell = e.target;
                let prevValue = this.currentCell.innerHTML.trim();
                let cellName = this.currentCell.getAttribute("data-cell-name");
                let inputType;
                switch (cellName) {
                    case "order_date":
                        inputType = "date";
                        break;
                    case "supplier_name":
                    case "product_name":
                        inputType = "text";
                        break;
                    default:
                        inputType = "number";
                }
                let editFormHtml = `
                    <div class="edit">
                        <form class="edit__form">
                            <input class="edit__input" type="${inputType}" required ${inputType === "number" ? "min='0'" : ""} value="${prevValue}" />
                            <button type="submit" class="edit__btn" title="Подтвердить"><img src="img/icon--check.svg" alt=""></button>
                        </form>
                    </div>
                `;
                this.currentCell.setAttribute("data-tmp-value", prevValue);
                this.currentCell.innerHTML = editFormHtml;
                let editForm = this.currentCell.querySelector(".edit__form");
                let editInput = this.currentCell.querySelector(".edit__input");
                editForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    let isConfirm = confirm("Подтвердите изменение выбранной записи");
                    if (isConfirm) {
                        let orderId = parseInt(this.currentCell.closest(".table__row").getAttribute("data-order-id"), 10);
                        let cellName = this.currentCell.getAttribute("data-cell-name");
                        let newValue = cellName === "order_date" ? new Date(editInput.value.trim()).toLocaleDateString() : editInput.value.trim();
                        this.linkedDB.updateCell(orderId, cellName, newValue, () => {
                            this.linkedTable.updateCell(orderId, cellName, newValue);
                            this.setUserMode("edit");
                            this.currentCell = null;
                        })
                    }
                });
            }
        })
    }

    undoEdit() {
        this.currentCell.innerHTML = this.currentCell.getAttribute("data-tmp-value");
        this.currentCell.removeAttribute("data-tmp-value");
        this.currentCell = null;
    }

    setUserMode(mode) {
        this.userMode = mode;
        document.body.setAttribute("data-user-mode", mode);
    }
}