// Determine the proxy URL based on environment
// In production (Netlify), use Netlify Functions
// In development, use local backend or Netlify Functions
const getProxyUrl = () => {
    // Check if we have an explicit proxy URL set
    if (process.env.REACT_APP_ProxyUrl) {
        return process.env.REACT_APP_ProxyUrl;
    }
    
    // In production or Netlify, use Netlify Functions
    // Netlify Functions are accessible at /.netlify/functions/{function-name}
    if (process.env.NODE_ENV === 'production' || window.location.hostname.includes('netlify')) {
        return '/.netlify/functions/api-proxy';
    }
    
    // Development: try Netlify Functions first (if using Netlify Dev), fallback to local server
    return '/.netlify/functions/api-proxy';
};

const proxyUrl = getProxyUrl();

export const execute = async (path) => {
    // Use backend proxy - API key is handled server-side
    // For Netlify Functions, pass path as query parameter
    const apiUrl = `${proxyUrl}?path=${encodeURIComponent(path)}`;
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
