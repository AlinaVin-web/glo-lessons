'use strict';

let title = "Проект калькулятор";
const rollback = 25;
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 500;
let fullPrice = 10000;
let adaptive = false;
let service1, service2;
let servicePrice1 = 0, servicePrice2 = 0;
let servicePercentPrice = 0;

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
screens = screens.toLowerCase().split(", ");
console.log(screens);
console.log("Процент отката посреднику за работу " + (fullPrice * (rollback / 100)) + " рублей");

// Урок 3

title = prompt('Как называется ваш проект?', 'Проект калькулятор');
screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
adaptive = confirm("Нужен ли адаптив на сайте?");
service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга 1');
servicePrice1 = +prompt('Сколько это будет стоить?', '2000');
service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга 2');
servicePrice2 = +prompt('Сколько это будет стоить?', '4500');

fullPrice = screenPrice + servicePrice1 + servicePrice2;

servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
console.log(servicePercentPrice);

switch (true) {
    case (fullPrice >= 30000):
        console.log("Даем скидку в 10%");
        break;

    case ((fullPrice >= 15000) && (fullPrice < 30000)):
        console.log("Даем скидку в 5%");
        break;

    case ((fullPrice > 0) && (fullPrice < 15000)):
        console.log("Скидка не предусмотрена");
        break;

    default:
        console.log("Что-то пошло не так");
        break;
}

