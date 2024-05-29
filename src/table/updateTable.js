// Util Functions
const formatDate = (dateStr) => {
    const parts = dateStr.split('-');
    const formattedDateStr = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`;
    const date = new Date(formattedDateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const createRow = (data) => {
    return `<tr>
                <td>${data.bot}</td>
                <td>${data.czBannedCount}</td>
                <td>${data.skBannedCount}</td>
                <td>${data.bannedCount}</td>
                <td>${data.bannedPercentage}</td>
            </tr>`;
};

// Main Function
export function updateTable(data) {
    const latestData = data[data.length - 1];
    const tableBody = document.getElementById('bots-table');
    const tableTitle = document.getElementById('table-title');

    // Add new rows to the table
    const row = createRow(latestData);

    const formattedDate = formatDate(latestData.date);
    if (tableTitle) {
        tableTitle.innerHTML = `The latest data for ${formattedDate}`;
    }

    tableBody.innerHTML += row;
}
