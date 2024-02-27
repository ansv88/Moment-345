"use strict";
import Chart from "chart.js/auto";




//Diagrammet
const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red','Blue','Yellow', 'Green','Purple'],
        datasets: [{
            label: '# of votes',
            data: [12,19,3,5,2,3],
            borderWidth:1
        }]
    },
    options: {
        backgroundColor: ["red","blue","yellow", "green","purple"]
    }
});