import domains from './domains.json' with { type: 'json' };
import { getMostFrequentCategory } from './processCategories.js';

function simplifyCategory(category) {
    const categoryMap = new Map([
        [/entertainment|games|media sharing|video hosting|radiomusic|arts & society & culture/i, "Entertainment"],
        [/shopping|online shopping|auctions and classified ads|onlineshop|internet auctions/i, "Online Shopping"],
        [/finance|financial|financial services|finance & investment|financial data and services/i, "Business/Economy & Employment"],
        [/gambling/i, "Entertainment"],
        [/news|tabloids|news and media/i, "News & Media"],
        [/information technology|computersandsoftware|computing & technology|information security|software-hardware|web infrastructure|application and software download/i, "Technology & Software"],
        [/government|legal|government & legal|military|political organization/i, "Government/Legal"],
        [/business|economy|marketing|marketing & merchandising|professional and worker organizations/i, "Business/Economy & Employment"],
        [/society|lifestyle|fashion & beauty|human interests|advice|social and affiliation organizations|society and culture/i, "Society/Lifestyle & Health"],
        [/misc|unknown|unrated|parked|parked sites/i, "Other"],
        [/health|health & medicine|pharmacy|narcoticsgeneral/i, "Society/Lifestyle & Health"],
        [/travel|food & dining|restaurants and dining/i, "Society/Lifestyle & Health"],
        [/real estate|realestate/i, "Business/Economy & Employment"],
        [/search engines|searchengines|search engines & portals|portals/i, "Search Engines & Portals"],
        [/vehicles|motor vehicles|auto/i, "Society/Lifestyle & Health"],
        [/job search|jobsearch/i, "Business/Economy & Employment"],
        [/online services|web applications|webmail|personal network storage/i, "Technology & Software"],
        [/education|educational institutions|education & reference/i, "Education & Culture"],
        [/sports/i, "Society/Lifestyle & Health"],
        [/hobbies|hobbies\/recreation|recreation|occult|astrology/i, "Society/Lifestyle & Health"],
        [/blogs|forums|message boards and forums|blogs and forums|forums & newsgroups|blogs & wikis|blogs and personal sites/, "Blogs and Forums"],
        [/food/, "Society/Lifestyle & Health"],
        [/alcohol|tobacco|alcohol & tobacco/, "Alcohol & Tobacco"],
        [/adult content|porn|sextoys/, "Adult Content"],
        [/non-profits|ngos and non profits|non-profit\/advocacy/i, "NGOs and Non-Profits"],
        [/service and philanthropic organizations/i, "NGOs and Non-Profits"],
        [/religion|traditional religions|religion and spirituality/, "Religion"],
        [/dynamic dns and isp sites/i, "Technology & Software"],
        [/content server/i, "Society/Lifestyle & Health"],
        [/social networks|social networking|social web - facebook/i, "Social Networks"],
        [/ads|advertisements|ads\/analytics/i, "Technology & Software"],
        [/web analytics|pay-to-surf/i, "Technology & Software"],
        [/hosting|web hosting/, "Technology & Software"],
        [/illegal software|piracy|malware sites/i, "Technology & Software"],
        [/reference|reference materials|technical information/, "Education & Culture"],
        [/cultural institutions/, "Education & Culture"],
        [/sex education/, "Other"],
        [/weapons/, "Other"],
        [/media file download/i, "News & Media"],
    ]);

    for (let [regex, simplifiedCategory] of categoryMap) {
        if (regex.test(category.toLowerCase())) {
            return simplifiedCategory;
        }
    }
    return "Other";
}

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

let uniqueCategories = new Set();

// Main Function
export function updateWebsitesTable(data, botIndex) {
    const latestData = data.pop();
    const tableBody = document.getElementById('websites-table');
    
    const formattedData = domains.domains.map((item) => {
        const categories = Object.values(item.categories);
        let category = getMostFrequentCategory(categories);
        category = category ? capitalizeFirstLetter(category.split('(')[0].trim()) : 'Other';
        category = simplifyCategory(category);
        uniqueCategories.add(category);
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
    console.log(uniqueCategories)
};