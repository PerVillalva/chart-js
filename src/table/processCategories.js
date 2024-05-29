function getSimilarityScore(category1, category2) {
    let words1 = new Set(category1.split(' '));
    let words2 = new Set(category2.split(' '));
    let commonWords = new Set([...words1].filter((word) => words2.has(word)));
    return commonWords.size / Math.min(words1.size, words2.size);
}

export function getMostFrequentCategory(categories, similarityThreshold = 0.5) {
    let categoryCounts = {};

    // Filter out "unknown" categories
    let filteredCategories = Object.values(categories).filter(
        (category) => category.toLowerCase() !== 'unknown'
    );

    for (let category1 of filteredCategories) {
        for (let category2 in categoryCounts) {
            if (
                getSimilarityScore(category1, category2) >= similarityThreshold
            ) {
                category1 = category2;
                break;
            }
        }
        categoryCounts[category1] = (categoryCounts[category1] || 0) + 1;
    }

    let mostFrequentCategory = null;
    let maxCount = 0;

    for (let category in categoryCounts) {
        if (categoryCounts[category] > maxCount) {
            mostFrequentCategory = category;
            maxCount = categoryCounts[category];
        }
    }

    return mostFrequentCategory;
}
