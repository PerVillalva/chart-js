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
    try {
        const response = await axios({
            url: `https://api.apify.com/v2/key-value-stores/GyQJDcUHMA2zWjd8B/records/${botName}`,
            method: 'GET',
            mode: 'no-cors',
        });

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
    } catch (error) {
        console.error(`Failed to fetch data for bot ${botName}:`, error);
        // Optionally, return an empty array or a specific error object depending on your application's needs
        return [];
    }
};
