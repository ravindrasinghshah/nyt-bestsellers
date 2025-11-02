import execute from './base.js';

// Get Best Sellers list names.
const Names = () => {
    return execute("names.json?");
};

// Get books for all the Best Sellers lists for specified date.
const TopBooksBestSellingByDate = () => {
    var d = new Date().toISOString().split('T')[0];
    return execute(`overview.json?published_date=${d}&`);
};

// Get Best Sellers list by date.
const BestSellingByName = (name) => {
    return execute(`current/${name}.json?`);
};

// Get all books for all the Best Sellers lists for specified date.
const BestSellingByDate = (date) => {
    return execute(`full-overview.json?published_date=${date}`);
};

// Get Best Sellers list history.
const BestSellingHistory = () => {
    return execute(`best-sellers/history.json?`);
};
// Get books by published date and category
const BooksByDateAndCategory = (p_date, category) => {
    return execute(`${p_date}/${category}.json?`);
}

// Get books by published date and category and title
const BookByDate_Category_Title = async (p_date, category, title) => {
    // Create a unique key for localStorage
    const storageKey = `book_${p_date}_${category}_${title}`;
    
    // Check localStorage first
    try {
        const cachedBook = localStorage.getItem(storageKey);
        if (cachedBook) {
            const parsedBook = JSON.parse(cachedBook);
            return parsedBook;
        }
    } catch (error) {
        console.error("Error parsing cached book:", error);
        // If parsing fails, continue to API call
    }
    
    // If not in localStorage, fetch from API
    var promise = BooksByDateAndCategory(p_date, category);
    const response = await promise;
    if (response && response.results && response.results.books
        && response.results.books.length > 0) {
        var book = response.results.books.filter(book_1 => book_1.title === title).map(result => (result));

        if (book.length > 0) {
            const bookData = book[0];
            // Save to localStorage for future use
            try {
                localStorage.setItem(storageKey, JSON.stringify(bookData));
            } catch (error) {
                console.error("Error saving book to localStorage:", error);
            }
            return bookData;
        }
        else
            return null;
    }
    return null;
}


export const service = {
    getNames: Names,
    getTopBooksBestSellingByDate: TopBooksBestSellingByDate,
    getBestSellingByName: BestSellingByName,
    getBestSellingByDate: BestSellingByDate,
    getBestSellingHistory: BestSellingHistory,
    getBookByDate_Category_Title: BookByDate_Category_Title
};