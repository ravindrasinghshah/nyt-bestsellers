// API configuration
const NYT_API_BASE_URL = process.env.REACT_APP_ApiUrl;

// Determine whether to use direct API or Netlify Functions
const shouldUseDirectAPI = () => {
  // In production/Netlify, always use Netlify Functions (secure)
  if (
    process.env.NODE_ENV === "production" ||
    window.location.hostname.includes("netlify")
  ) {
    return false;
  }

  // In development, use direct API if API key is available
  // This makes local development easier without needing Netlify Dev
  return !!process.env.REACT_APP_ApiKey;
};

export const execute = async (path) => {
  let apiUrl;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  if (shouldUseDirectAPI()) {
    // Development: Use NYT API directly with API key from env
    const apiKey = process.env.REACT_APP_ApiKey;
    // Parse path - it may contain query parameters
    let nytPath = path;
    const queryParams = new URLSearchParams();

    // Check if path already contains query parameters
    const pathParts = nytPath.split("?");
    if (pathParts.length > 1) {
      nytPath = pathParts[0];
      const pathQueryParams = new URLSearchParams(pathParts[1]);
      pathQueryParams.forEach((value, key) => {
        queryParams.append(key, value);
      });
    }
    queryParams.set("api-key", apiKey);
    apiUrl = `${NYT_API_BASE_URL}${nytPath}?${queryParams.toString()}`;
  } else {
    // Production: Use Netlify Functions (secure - API key handled server-side)
    const proxyUrl = "/.netlify/functions/api-proxy";
    apiUrl = `${proxyUrl}?path=${encodeURIComponent(path)}`;
  }

  return await fetch(apiUrl, options).then(handleResponse);
};

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

export default execute;
