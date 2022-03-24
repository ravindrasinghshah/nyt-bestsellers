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
    return execute(`/current/${name}.json?`);
};

// Get all books for all the Best Sellers lists for specified date.
const BestSellingByDate = (date) => {
    return execute(`full-overview.json?published_date=${date}`);
};

// Get Best Sellers list history.
const BestSellingHistory = () => {
    return execute(`best-sellers/history.json`);
};
// Get books by published date and category
const BooksByDateAndCategory = (p_date, category) => {
    return execute(`${p_date}/${category}.json?`);
}

// Get books by published date and category and title
const BookByDate_Category_Title = async (p_date, category, title) => {
    var promise = BooksByDateAndCategory(p_date, category);
    const response = await promise;
    if (response && response.results && response.results.books
        && response.results.books.length > 0) {
        var book = response.results.books.filter(book_1 => book_1.title == title).map(result => (result));

        if (book.length > 0)
            return book[0];
        else
            return null;
    }
    return null;
}

export const service = {
    getNames: Names,
    getTop5BestSellingByDate: Top5BestSellingByDate,
    getBestSellingByName: BestSellingByName,
    getBestSellingByDate: BestSellingByDate,
    getBestSellingHistory: BestSellingHistory,
    getBookByDate_Category_Title: BookByDate_Category_Title
};