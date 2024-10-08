'use strict';

const pageTitle = document.getElementsByTagName("h1")[0];
const handlerButtons = document.getElementsByClassName("handler_btn");
const plusBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input[type='range']");
const rangeValue = document.querySelector(".rollback .range-value");
const totalInputs = document.getElementsByClassName("total-input");
let screens = document.querySelectorAll(".screen");

const appData = {
    rollback: 15,
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
            if (appData.title === null) appData.title = "";
        } while (appData.isNumber(appData.title) || appData.title.trim() === "");
        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какие типы экранов нужно разработать?', 'Интерактивные');
                if (name === null) name = "";
            } while (appData.isNumber(name) || name.trim() === "");
            let price;
            do {
                price = prompt('Сколько будет стоить данная работа?', '');
            } while (!appData.isNumber(price));
            appData.screens.push({ id: i, name: name, price: parseFloat(price.trim()) });
        }
        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
                if (name === null) name = "";
            } while (appData.isNumber(name) || name.trim() === "");
            let price;
            do {
                price = prompt('Сколько это будет стоить?', '');
            } while (!appData.isNumber(price));
            appData.services[i + 1 + ") " + name] = parseFloat(price.trim());
        }
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (sum, current) {
            return sum + current.price;
        }, 0);
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },
    getRollbackMessage: function (price) {
        switch (true) {
            case (price >= 30000):
                return "Даем скидку в 10%";
            case ((price >= 15000) && (price < 30000)):
                return "Даем скидку в 5%";
            case ((price > 0) && (price < 15000)):
                return "Скидка не предусмотрена";
            default:
                return "Что-то пошло не так";
        }
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services);
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getTitle();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.logger();
    }
}

appData.start();