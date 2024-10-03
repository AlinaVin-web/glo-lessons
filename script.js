'use strict';

const title = "Проект калькулятор";
const rollback = 25;
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 500;
let fullPrice = 10000;
let adaptive = false;

console.log(typeof title, typeof fullPrice, typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

screens = screens.toLowerCase().split(", ");
console.log(screens);

console.log("Процент отката посреднику за работу " + (fullPrice * (rollback / 100)) + " рублей");