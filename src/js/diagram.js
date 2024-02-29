"use strict";
import Chart from "chart.js/auto";

// Kalla på funktionen för att göra Fetch-anropet
getCourses();

async function getCourses() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        const data = await response.json();

        // Lagrar resultatet från filtrering- och sorteringsfunktionen i en variabel, anropa sedan diagramfunktionen
        const topCourses = await filterSortArray(data, 'Kurs', 6);
        displayChartBar(topCourses);

        // Anropa funktionen för att populera en ordnad lista med kursdata
        populateNumberExpl(topCourses);

        // Lagrar resultatet från filtrering- och sorteringsfunktionen i en variabel, anropa sedan diagramfunktionen
        const topPrograms = await filterSortArray(data, 'Program', 5);
        displayChartPie(topPrograms);

    } catch (error) {
        console.error('Fetch failed:', error.message);
    }
}

//Funktion för att filtrera och sortera datan från fetchanropet
async function filterSortArray(data, type, number) {
    try {
        // Filtrera ut kurser/program med namn och antal sökande totalt
        const filteredCourses = data.filter(course => {
            return course.type === type && course.name && course.applicantsTotal;
        });

        // Sortera kurserna efter antal sökande totalt i fallande ordning
        const sortedCourses = filteredCourses.sort((a, b) => parseInt(b.applicantsTotal) - parseInt(a.applicantsTotal));

        // Välj de första kurserna/programmen enligt angett antal (number)
        const arrangedArray = sortedCourses.slice(0, number);

        return arrangedArray;

    } catch (error) {
        console.error('Error filtering courses:', error.message);
    }
}

//Funktion för att skriva ut en lista med kursnamnen
function populateNumberExpl(topCourses) {
    const numberExplEl = document.querySelector('.numberexpl');
    const ol = document.createElement('ol');

    // Loopa genom topCourses och lägg till varje kurs som ett listelement i ordnad listan
    topCourses.forEach(course => {
        const li = document.createElement('li');
        const textNode = document.createTextNode(`${course.name} - Antal sökanden: ${course.applicantsTotal}`);

        li.appendChild(textNode);
        ol.appendChild(li);
    });

    numberExplEl.appendChild(ol);
}

//Funktion för att skriva ut stapeldiagram (bar)
function displayChartBar(incomingData) {
    const myBarChartEl = document.getElementById('barChart');

    // Skapa diagrammet med Chart.js
    new Chart(myBarChartEl, {
        type: 'bar',
        data: {
            labels: incomingData.map(entry => entry.name),
            datasets: [{
                label: 'Totalt antal sökande',
                data: incomingData.map(entry => entry.applicantsTotal),
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)', // Rosa
                    'rgba(54, 162, 235, 0.5)', // Blå
                    'rgba(255, 206, 86, 0.5)', // Gul
                    'rgba(75, 192, 192, 0.5)', // Grön
                    'rgba(153, 102, 255, 0.5)', // Lila
                    'rgba(255, 159, 64, 0.5)' // Orange
                ]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            indexAxis: 'y',
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        // Använd en formatteringsfunktion för att visa namn i desktopläge och siffror i mobilläge
                        callback: function (index) {
                            const isMobile = window.innerWidth <= 600; // Kontrollera om det är mobilläge
                            if (isMobile) {
                                return index + 1; // Visa siffror i mobilläge
                            } else {
                                return incomingData.map(entry => entry.name)[index]; // Visa namn i desktopläge
                            }
                        }
                    }
                }
            }
        }
    });

}

// Funktion för att skapa cirkeldiagram (pie)
function displayChartPie(incomingData) {
    const myPieChartEl = document.getElementById('pieChart');

    // Skapa diagrammet med Chart.js
    new Chart(myPieChartEl, {
        type: 'pie',
        data: {
            labels: incomingData.map(entry => entry.name),
            datasets: [{
                label: 'Totalt antal sökande',
                data: incomingData.map(entry => entry.applicantsTotal),
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    onClick: () => { } // Tom funktion för att inaktivera klickfunktionen på legend labels
                }
            },
        }
    });

}