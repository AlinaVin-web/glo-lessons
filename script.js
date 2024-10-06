'use strict';

const rollback = 25;
let title = prompt('Как называется ваш проект?', 'Проект калькулятор');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга 1');
let servicePrice1 = +prompt('Сколько это будет стоить?', '2000');
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'Услуга 2');
let servicePrice2 = +prompt('Сколько это будет стоить?', '4500');

let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
screens = screens.toLowerCase().split(", ");
console.log(screens);
console.log("Процент отката посреднику за работу " + (fullPrice * (rollback / 100)) + " рублей");
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