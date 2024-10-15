'use strict';

const pageTitle = document.getElementsByTagName("h1")[0];
const startButton = document.getElementsByClassName("handler_btn")[0];
const resetButton = document.getElementsByClassName("handler_btn")[1];
const plusBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input[type='range']");
const rangeValue = document.querySelector(".rollback .range-value");
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
const cmsCheckbox = document.getElementById("cms-open");
const cmsBlock = document.querySelector(".hidden-cms-variants");
const cmsInputContainer = document.querySelector(".hidden-cms-variants .main-controls__input");
const cmsInput = cmsInputContainer.querySelector("input");
const cmsSelect = document.querySelector(".hidden-cms-variants select");
let screens = document.querySelectorAll(".screen");

const appData = {
    rollback: 0,
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    addTitle: function () {
        document.title = pageTitle.textContent;
    },
    startButtonIsActive: function (flag) {
        if (flag) {
            startButton.disabled = false;
            startButton.style = "opacity: 1; pointer-events: auto;";
        } else {
            startButton.disabled = true;
            startButton.style = "opacity: 0.5; pointer-events: none;";
        }
    },
    checkEmptyFields: function () {
        screens = document.querySelectorAll(".screen");
        for (let elem of screens) {
            if (elem.querySelector("select").value === "") { this.startButtonIsActive(false); return; }
            if (elem.querySelector("input").value === "") { this.startButtonIsActive(false); return; }
        };
        if (cmsCheckbox.checked && (cmsSelect.value === "" || (cmsSelect.value === "other" && cmsInput.value === ""))) {
            this.startButtonIsActive(false); return;
        }
        this.startButtonIsActive(true);
    },
    addScreenBlock: function () {
        screens = document.querySelectorAll(".screen");
        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.classList.add("dynamic-node");
        cloneScreen.addEventListener("input", this.checkEmptyFields.bind(appData));
        screens[screens.length - 1].after(cloneScreen);
        this.startButtonIsActive(false);
    },
    changeRange: function () {
        rangeValue.textContent = inputRange.value + "%";
        this.rollback = inputRange.value;
        if (totalFullCount.value !== "0") {
            totalCountRollback.value = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
        }
    },
    calcIsDone: function (flag) {
        for (let elem of screens) {
            elem.querySelector("select").disabled = flag;
            elem.querySelector("input").disabled = flag;
        }
        otherItemsPercent.forEach((item) => {
            item.querySelector("input[type=checkbox]").disabled = flag;
        });
        otherItemsNumber.forEach((item) => {
            item.querySelector("input[type=checkbox]").disabled = flag;
        });
        cmsCheckbox.disabled = flag;
        cmsInput.disabled = flag;
        cmsSelect.disabled = flag;
        startButton.style.display = flag ? "none" : "";
        resetButton.style.display = flag ? "" : "none";
        plusBtn.style.display = flag ? "none" : "";
    },
    cmsChecked: function () {
        this.checkEmptyFields();
        cmsBlock.style.display = cmsCheckbox.checked ? "flex" : "none";
    },
    cmsOther: function () {
        this.checkEmptyFields();
        cmsInputContainer.style.display = cmsSelect.value === "other" ? "" : "none";
    },
    cmsInputValue: function () {
        this.checkEmptyFields();
    },

    addScreens: function () {
        this.screens = [];
        screens = document.querySelectorAll(".screen");
        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
        });
    },
    addServices: function () {
        this.servicesPercent = [];
        this.servicesNumber = [];
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addPrices: function () {
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.screenPrice = this.screens.reduce((sum, current) => {
            return sum + current.price;
        }, 0);
        this.screenCount = this.screens.reduce((sum, current) => {
            return sum + current.count;
        }, 0);
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        if (cmsCheckbox.checked && cmsSelect.value === "50") this.servicePricesPercent += this.screenPrice / 2;

        if (cmsCheckbox.checked && cmsSelect.value === "other" && cmsInput.value !== "") this.servicePricesPercent += this.screenPrice * (+cmsInput.value / 100);
        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCount.value = this.screenCount;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        totalFullCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },
    logger: function () {
        //console.log(appData);
    },
    reset: function () {
        this.rollback = 0;
        this.screens = [];
        this.screenPrice = 0;
        this.screenCount = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;

        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        totalFullCount.value = 0;
        totalCountRollback.value = 0;
        inputRange.value = 0;
        rangeValue.textContent = "0%";
        cmsInput.value = "";
        cmsSelect.value = "";
        cmsCheckbox.checked = false;
        cmsInputContainer.style.display = "none";
        cmsBlock.style.display = "none";

        this.calcIsDone(false);
        otherItemsPercent.forEach((item) => {
            item.querySelector("input[type=checkbox]").checked = false;
        });
        otherItemsNumber.forEach((item) => {
            item.querySelector("input[type=checkbox]").checked = false;
        });
        screens.forEach((item) => {
            if (!item.classList.contains("dynamic-node")) {
                item.querySelector("select").value = "";
                item.querySelector("input").value = "";
            } else item.remove();
        });
        this.checkEmptyFields();
        window.scrollTo(0, 0);
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.calcIsDone(true);
        this.logger();
    },
    init: function () {
        this.addTitle();
        this.startButtonIsActive(false);
        startButton.addEventListener("click", this.start.bind(appData));
        resetButton.addEventListener("click", this.reset.bind(appData));
        plusBtn.addEventListener("click", this.addScreenBlock.bind(appData));
        screens.forEach((elem) => {
            elem.querySelector("select").addEventListener("input", this.checkEmptyFields.bind(appData));
            elem.querySelector("input").addEventListener("input", this.checkEmptyFields.bind(appData));
        });
        inputRange.addEventListener("input", this.changeRange.bind(appData));
        cmsCheckbox.addEventListener("input", this.cmsChecked.bind(appData));
        cmsSelect.addEventListener("input", this.cmsOther.bind(appData));
        cmsInput.addEventListener("input", this.cmsInputValue.bind(appData));
    }
}

appData.init();