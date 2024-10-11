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
            if (elem.querySelector("select").value === "") { appData.startButtonIsActive(false); return; }
            if (elem.querySelector("input").value === "") { appData.startButtonIsActive(false); return; }
        };
        appData.startButtonIsActive(true);
    },
    addScreenBlock: function () {
        screens = document.querySelectorAll(".screen");
        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.addEventListener("input", appData.checkEmptyFields);
        screens[screens.length - 1].after(cloneScreen);
        appData.startButtonIsActive(false);
    },
    changeRange: function () {
        rangeValue.textContent = inputRange.value + "%";
        appData.rollback = inputRange.value;
        if (totalFullCount.value !== "0") {
            totalCountRollback.value = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
        }
    },
    addScreens: function () {
        appData.screens = [];
        screens = document.querySelectorAll(".screen");
        screens.forEach(function (screen, index) {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const selectName = select.options[select.selectedIndex].textContent;
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
        });
    },
    addServices: function () {
        appData.servicesPercent = [];
        appData.servicesNumber = [];
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addPrices: function () {
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.screenPrice = appData.screens.reduce(function (sum, current) {
            return sum + current.price;
        }, 0);
        appData.screenCount = appData.screens.reduce(function (sum, current) {
            return sum + current.count;
        }, 0);
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.screenCount;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalFullCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },
    logger: function () {
        //console.log(appData);
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        appData.logger();
    },
    init: function () {
        appData.addTitle();
        appData.startButtonIsActive(false);
        startButton.addEventListener("click", appData.start);
        plusBtn.addEventListener("click", appData.addScreenBlock);
        screens.forEach(function (elem) {
            elem.querySelector("select").addEventListener("input", appData.checkEmptyFields);
            elem.querySelector("input").addEventListener("input", appData.checkEmptyFields);
        });
        inputRange.addEventListener("input", appData.changeRange);
    }
}

appData.init();