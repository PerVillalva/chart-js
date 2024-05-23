import domains from './domains.json' with { type: 'json' };

export function updateWebsitesTable(data, botIndex) {
    const latestData = data.pop();
    const tableBody = document.getElementById('websites-table');
    const domainsArray = domains.domains.map(website => 
        website.toLowerCase().trim().replace('www.', '').replace('https://', ''));

    for (let i = 0; i < domainsArray.length; i++) {
        let row = tableBody.querySelector(
            `tr[data-domain="${domainsArray[i]}"]`
        );

        if (!row) {
            row = document.createElement('tr');
            row.dataset.domain = domainsArray[i];
            row.innerHTML = `<td>${i + 1}</td><td>${domainsArray[i]}</td>`;
            tableBody.appendChild(row);
        }

        const status =
            latestData && latestData.bannedSites.includes(domainsArray[i])
                ? 'Blocked'
                : 'Allowed';
        const cell = row.children[botIndex + 2] || row.insertCell();
        cell.textContent = status;

        // Add the class to the cell
        if (status === 'Allowed') {
            cell.classList.add('has-text-success');
        } else {
            cell.classList.add('has-text-danger');
        }
    }
}
