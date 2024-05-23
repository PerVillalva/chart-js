import { fetchData } from './data.js';
import { updateTable } from './table/updateTable.js';
import { updateWebsitesTable } from './table/websitesTable.js';

const ctx = document.getElementById('bot-chart');

const aiBots = ['anthropic-ai', 'chatgpt-user', 'claudebot', 'gptbot'];

// Clear the table body
const tableBody = document.getElementById('bots-table');
tableBody.innerHTML = '';

let dataArray = [];
let weeklyDatesArray = [];

for (const bot of aiBots) {
    const botData = await fetchData(bot);
    updateTable(botData);
    const botBanValues = botData.map((record) =>
        parseFloat(record.bannedPercentage)
    );
    const weeklyBotBanValues = botBanValues.filter(
        (_, index) => index % 7 === 0
    );
    const weeklyDates = botData
        .filter((record, index) => index % 7 === 0)
        .map((record) => record.date);

    dataArray.push({
        label: bot,
        data: weeklyBotBanValues,
        borderWidth: 1,
    });

    weeklyDatesArray.push(weeklyDates);
}

// Use the dates from the first bot as the labels for the chart
const labels = weeklyDatesArray[0];

new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: dataArray,
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'The Percent of the Top 2000 CZ/SK Websites Blocking AI Web Crawlers',
                font: {
                    family: 'Trebuchet MS, sans-serif',
                    size: 18,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '% of Top 2000',
                    font: {
                        family: 'Trebuchet MS, sans-serif',
                        size: 18,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        family: 'Trebuchet MS, sans-serif',
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
            },
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
    },
});

let botStatsTable = new DataTable('#bots', {
    paging: false,
    searching: false,
    info: false,
});

const aiBotsFull = [
    'anthropic-ai',
    'chatgpt-user',
    'claudebot',
    'gptbot',
    'diffbot',
    'cohere-ai',
    'claude-web',
    'machinelearning',
];

for (let i = 0; i < aiBotsFull.length; i++) {
    const botData = await fetchData(aiBotsFull[i]);
    updateWebsitesTable(botData, i, aiBotsFull);
}

let websitesTable = new DataTable('#websites', { info: false });
