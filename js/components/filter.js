export default class Filter {

    constructor(wrapper, linkedTable) {
        this.isHidden = true;
        this.wrapper = wrapper;
        this.linkedTable = linkedTable;
        this.toggleBtn = this.wrapper.querySelector(".filter__toggle");
        this.form = this.wrapper.querySelector(".filter__form");
        this.inputs = this.form.querySelectorAll(".filter__input");
        this.data = {};
        this.init();
    }

    init() {
        this.toggleBtn.addEventListener("click", () => {
            this.isHidden = !this.isHidden;
            this.wrapper.classList.toggle("filter--hidden");
            if (this.isHidden) this.reset();
        });

        this.inputs.forEach(input => {
            input.addEventListener("input", () => {
                this.collectInputsData();
                this.linkedTable.filter(this.data);
            })
        });
    }

    collectInputsData() {
        this.inputs.forEach(input => {
            this.data[input.getAttribute("name")] = input.value.trim().toLowerCase();
        });
    }

    reset() {
        this.form.reset();
        this.data = {};
        this.linkedTable.filter();
    }
}