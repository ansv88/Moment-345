"use strict";

//Variabler
const searchInput = document.getElementById('search-input');
const resultList = document.getElementById('search-results');
let marker; // Variabel för kartmarkören

// Händelsehanterare
searchInput.addEventListener('input', handleSearchInput, false);

// Skapa kartan och sätt startposition och zoomnivå
const map = L.map('map').setView([62.1772097, 14.9394367], 13);

// Lägg till ett OpenStreetMap-kartlager till kartan
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Funktion för att hämta data från OpenStreetMap med värdet från sökfältet
async function getData(searchInput) {
    try {
        const response = await fetch("https://nominatim.openstreetmap.org/search?addressdetails=1&q=" + searchInput + "&format=jsonv2&limit=5");
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
        throw new Error("Något gick fel, försök igen!");
    }
}

// Funktion för att visa sökresultaten i en lista och göra dem klickbara
function showSearchResults(results) {
    resultList.innerHTML = ''; // Rensa sökresultatlistan

    results.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = result.display_name;
        listItem.addEventListener('click', function () { suggestionClick(result); });
        resultList.appendChild(listItem);
    });
}

// Funktion för att hantera input i sökfältet
async function handleSearchInput() {
    const searchText = searchInput.value.trim(); // Trimma bort eventuella mellanslag i början och slutet av söktexten

    // Kontrollera om söktexten är tom eller ej
    if (searchText) {
        try {
            const data = await getData(searchText);

            showSearchResults(data); // Kör funktionen för att visa sökresultaten
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        resultList.innerHTML = ''; // Rensa sökresultatlistan om söktexten är tom
    }
}

// Funktion för klick på ett förslag i resultatlistan
function suggestionClick(suggestion) {
    map.setView([suggestion.lat, suggestion.lon], 13);
    if (marker) {
        marker.setLatLng([suggestion.lat, suggestion.lon]);
    } else {
        marker = L.marker([suggestion.lat, suggestion.lon]).addTo(map);
    }

    searchInput.value = suggestion.display_name; // Uppdatera sökfältet med platsens namn

    resultList.innerHTML = ''; // Rensa sökresultatlistan
}

