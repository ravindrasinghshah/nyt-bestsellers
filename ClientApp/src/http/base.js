const url = process.env.REACT_APP_ApiUrl;
const apiKey = process.env.REACT_APP_ApiKey;

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
