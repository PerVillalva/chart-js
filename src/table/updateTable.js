export function updateTable(data) {
    const latestData = data[data.length - 1];

    const tableBody = document.getElementById('bots-table');
    const tableTitle = document.getElementById('table-title');

    // Add new rows to the table
    const row = `<tr>
                        <td>${latestData.bot}</td>
                        <td>${latestData.czBannedCount}</td>
                        <td>${latestData.skBannedCount}</td>
                        <td>${latestData.bannedCount}</td>
                        <td>${latestData.bannedPercentage}</td>
                    </tr>`;

    let parts = latestData.date.split('-');
    let formattedDateStr = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`;
    let date = new Date(formattedDateStr);
    let formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    if (tableTitle) {
        tableTitle.innerHTML = '';
        tableTitle.innerHTML = `The latest data for ${formattedDate}`;
    }

    tableBody.innerHTML += row;
}
