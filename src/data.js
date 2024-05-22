// import axios from 'axios';

// Util functions
const sortDataByDate = (data) => {
    return data.sort((a, b) => {
        const dateA = a.date.split('-').reverse().join('');
        const dateB = b.date.split('-').reverse().join('');
        return dateA > dateB ? 1 : -1;
    });
};

// Data Functions
export const fetchData = async (botName) => {
    const response = await axios.get(
        `https://api.apify.com/v2/key-value-stores/GyQJDcUHMA2zWjd8B/records/${botName}`
    );

    const records = response.data.records;
    const sortedRecords = sortDataByDate(records);

    const uniqueRecords = [];
    const dates = new Set();

    for (const record of sortedRecords) {
        if (!dates.has(record.date)) {
            dates.add(record.date);
            uniqueRecords.push(record);
        }
    }

    return uniqueRecords;
};
