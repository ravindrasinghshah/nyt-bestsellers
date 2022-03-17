import execute from './base.js';

// Get Best Sellers list names.
const Names = () => {
    return execute("names.json?");
};

// Get top 5 books for all the Best Sellers lists for specified date.
const Top5BestSellingByDate = () => {
    var d = new Date().toISOString().split('T')[0];
    return execute(`overview.json?published_date=${d}&`);
};

// Get Best Sellers list by date.
const BestSellingByName = (name) => {
    return execute(`?list=${name}&`);
};

// Get all books for all the Best Sellers lists for specified date.
const BestSellingByDate = (date) => {
    return execute(`full-overview.json?published_date=${date}`);
};

// Get Best Sellers list history.
const BestSellingHistory = () => {
    return execute(`best-sellers/history.json`);
};


export const service = {
    getNames: Names,
    getTop5BestSellingByDate: Top5BestSellingByDate,
    getBestSellingByName: BestSellingByName,
    getBestSellingByDate: BestSellingByDate,
    getBestSellingHistory: BestSellingHistory
};