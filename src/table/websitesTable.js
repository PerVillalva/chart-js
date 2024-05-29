import domains from './domains.json' with { type: 'json' };
import { getMostFrequentCategory } from './processCategories.js';

// Util Functions
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

const formatDomain = domain => domain.toLowerCase().trim().replace('www.', '').replace('https://', '');

const createRow = (index, domain, category) => {
    const row = document.createElement('tr');
    row.dataset.domain = domain;
    row.innerHTML = `<td>${index + 1}</td><td>${domain}</td><td>${category}</td>`;
    return row;
};

const updateCell = (row, botIndex, status) => {
    const cellIndex = botIndex + 3;
    const cell = row.children[cellIndex] || row.insertCell(cellIndex);
    cell.textContent = status;
    cell.style.color = status === 'Allowed' ? '#23d160' : '#ff3860';
};

// Main Function
export function updateWebsitesTable(data, botIndex) {
    const latestData = data.pop();
    const tableBody = document.getElementById('websites-table');
    
    const formattedData = domains.domains.map((item) => {
        const categories = Object.values(item.categories);
        let category = getMostFrequentCategory(categories);
        category = category ? capitalizeFirstLetter(category.split('(')[0].trim()) : 'Unknown';
        return {
            domain: formatDomain(item.domain),
            category: category
        };
    });

    formattedData.forEach((item, i) => {
        let row = tableBody.querySelector(`tr[data-domain="${item.domain}"]`) || createRow(i, item.domain, item.category);
        if (!tableBody.contains(row)) tableBody.appendChild(row);

        const status = latestData && latestData.bannedSites.includes(item.domain) ? 'Blocked' : 'Allowed';
        updateCell(row, botIndex, status);
    });
};