// import Chart from 'chart.js/auto';
import { fetchData } from './data.js';

const ctx = document.getElementById('myChart');

const aiBots = ['anthropic-ai', 'chatgpt-user', 'claudebot', 'gptbot'];

// const discardedBots = ['diffbot', 'cohere-ai', 'claude-web', 'machinelearning'];

let dataArray = [];
let weeklyDatesArray = [];

for (const bot of aiBots) {
    const botData = await fetchData(bot);
    const botBanValues = botData.map((record) =>
        parseFloat(record.bannedCount)
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
                text: 'The Percent of the Top 1000 Websites Blocking AI Web Crawlers',
                font: {
                    family: 'Poppins',
                    size: 20,
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
                        family: 'Poppins',
                        size: 20,
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
                        family: 'Poppins',
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
