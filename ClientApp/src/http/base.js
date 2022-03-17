const url = `https://api.nytimes.com/svc/books/v3/lists/`;
const apiKey = `lwZEVfolIZS1lGUG4Zi8TIbXi0FJpmom`;

export const execute = async (path) => {
    let apiUrl = url + path + "api-key=" + apiKey;
    const options = {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    };
    return await fetch(apiUrl, options).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}

export default execute;
