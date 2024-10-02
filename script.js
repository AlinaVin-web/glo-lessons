'use strict';

const books = document.querySelectorAll(".book");
const body = document.querySelector("body");
const adv = document.querySelector(".adv");
const listBook2 = books[0].querySelectorAll(".book li");
const listBook5 = books[5].querySelectorAll(".book li");
const listBook6 = books[2].querySelectorAll(".book li");

books[0].before(books[1]);
books[3].before(books[4]);
books[5].after(books[2]);

body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

books[4].querySelector("h2 a").textContent = "Книга 3. this и Прототипы Объектов";

adv.remove();

/*
listBook5.forEach(function (item, index) {
    item.insertAdjacentText('afterbegin', index + " - "); //Отображение индексов для наглядности
});
*/

listBook2[9].after(listBook2[2]);
listBook2[3].after(listBook2[6]);
listBook2[6].after(listBook2[8]);

listBook5[1].after(listBook5[9]);
listBook5[4].after(listBook5[2]);
listBook5[7].after(listBook5[5]);

listBook6[8].insertAdjacentHTML("afterend", "<li>Глава 8: За пределами ES6</li>");