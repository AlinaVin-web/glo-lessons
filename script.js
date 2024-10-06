'use strict';

const appData = {
    rollback: 15,
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?', '');
        } while (!appData.isNumber(appData.screenPrice));
        appData.screenPrice = parseFloat(appData.screenPrice.trim());
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    getTitle: function (str) {
        str = str.trim().toLowerCase();
        str = str[0].toUpperCase() + str.slice(1);
        return str;
    },

    getAllServicePrices: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            let answer;
            if (i === 0) appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
            else appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм');
            do {
                answer = prompt('Сколько это будет стоить?', '');
            }
            while (!appData.isNumber(answer));
            sum += parseFloat(answer.trim());
        }
        return sum;
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

    getFullPrice: function (screen, services) {
        return screen + services;
    },

    getServicePercentPrices: function () {
        return Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },

    logger: function () {
        console.log(appData.getRollbackMessage(appData.fullPrice));
        for (const property in appData) {
            if (typeof appData[property] !== "function") {
                console.log(property + " - " + appData[property]);
            } else console.log(property);
        }
    },

    start: function () {
        appData.asking();
        appData.title = appData.getTitle(appData.title);
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.logger();
    }
}

appData.start();