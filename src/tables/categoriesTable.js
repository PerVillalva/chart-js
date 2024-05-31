const createRow = (category, counts, numberOfWebsitesPerCategory) => {
    const tr = document.createElement('tr');
    ['category', 'numberOfWebsites', 'CZ', 'SK', 'total', 'percentage'].forEach(
        (id) => {
            const td = document.createElement('td');
            switch (id) {
                case 'category':
                    td.textContent = category;
                    break;
                case 'numberOfWebsites':
                    td.textContent = numberOfWebsitesPerCategory[category];
                    break;
                case 'percentage':
                    td.textContent =
                        (
                            (counts.total /
                                numberOfWebsitesPerCategory[category]) *
                            100
                        ).toFixed(1) + '%';
                    break;
                default:
                    td.textContent = counts[id] || 0;
            }
            tr.appendChild(td);
        }
    );
    return tr;
};

let categoryCounts = {};

const initializeCategoryCounts = (category) => {
    if (!categoryCounts[category]) {
        categoryCounts[category] = {
            CZ: 0,
            SK: 0,
            total: 0,
            totalWebsites: 0,
        };
    }
};

// Main Function
export function updateCategoriesTable(data, numberOfWebsitesPerCategory) {
    data.forEach((record) => {
        initializeCategoryCounts(record.category);
        categoryCounts[record.category][record.country]++;
        categoryCounts[record.category].total++;
        categoryCounts[record.category].totalWebsites++;
    });

    const tableBody = document.getElementById('categories-table');
    const tableTitle = document.getElementById('categories-table-title');

    // Add new rows to the table
    for (let category in numberOfWebsitesPerCategory) {
        const counts = categoryCounts[category] || {
            CZ: 0,
            SK: 0,
            total: 0,
            totalWebsites: 0,
        };
        const row = createRow(category, counts, numberOfWebsitesPerCategory);
        tableBody.appendChild(row);
    }

    if (tableTitle) {
        tableTitle.textContent = `The latest data for ${data[0].date}`;
    }
}
