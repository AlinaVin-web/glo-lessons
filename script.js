'use strict';

const rollback = 15;
let title;
let screens;
let screenPrice;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
    do {
        screenPrice = prompt('Сколько будет стоить данная работа?', '');
    } while (!isNumber(screenPrice));
    screenPrice = parseFloat(screenPrice.trim());
    adaptive = confirm("Нужен ли адаптив на сайте?");
}

const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        let answer;
        if (i === 0) service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика');
        else service2 = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм');
        do {
            answer = prompt('Сколько это будет стоить?', '');
        }
        while (!isNumber(answer));
        sum += parseFloat(answer.trim());
    }
    return sum;
}

const getRollbackMessage = function (price) {
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
}

function getFullPrice(screen, services) {
    return screen + services;
}

const getTitle = function (str) {
    str = str.trim().toLowerCase();
    str = str[0].toUpperCase() + str.slice(1);
    return str;
}

const getServicePercentPrices = function (price, rBack) {
    return Math.ceil(price - price * (rBack / 100));
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);
screens = screens.toLowerCase().split(", ");

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);
console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость за вычетом процента отката посреднику " + servicePercentPrice);