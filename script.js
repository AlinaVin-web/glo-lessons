'use strict';

const rollback = 25;
let title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга 1');
let servicePrice1 = +prompt('Сколько это будет стоить?', '2000');
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга 2');
let servicePrice2 = +prompt('Сколько это будет стоить?', '4500');

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
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

const getAllServicePrices = function (price1, price2) {
    return price1 + price2;
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

let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
let fullPrice = getFullPrice(screenPrice, allServicePrices);
let servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

title = getTitle(title);
screens = screens.toLowerCase().split(", ");

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость за вычетом процента отката посреднику " + servicePercentPrice);
