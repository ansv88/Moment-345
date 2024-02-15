"use strict";

//Variabler
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');
const spiderBtn = document.getElementById('button');
const spider = document.getElementById('spider');

// Händelsehanterare
toggleBtn.addEventListener("click", toggleMenu, false);
spiderBtn.addEventListener("click", surpriseSpider, false);

// Funktion för att öppna och stänga menyn i mobilläge
function toggleMenu() {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

//Funktion för spindeln
function surpriseSpider() {
    spider.classList.toggle('hidden');
}
