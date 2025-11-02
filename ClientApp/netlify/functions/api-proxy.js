// Netlify serverless function to proxy NYT Books API requests
// This function keeps the API key secure on the server side

const NYT_API_BASE_URL = process.env.REACT_APP_ApiUrl || 'https://api.nytimes.com/svc/books/v3/lists';
const NYT_API_KEY = process.env.REACT_APP_ApiKey;

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Get API key from environment variable
    if (!NYT_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error:
            "API key not configured. Please set NYT_API_KEY in Netlify environment variables.",
        }),
      };
    }

    // Get the path from the query string parameter
    // The path will be passed as a query parameter: ?path=names.json or ?path=overview.json?published_date=2024-01-01
    const path = event.queryStringParameters?.path || "";

    if (!path) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Path parameter is required" }),
      };
    }

    // Parse the path - it may contain query parameters
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

    // Add any additional query parameters from the event
    Object.keys(event.queryStringParameters || {})
      .filter((key) => key !== "path")
      .forEach((key) => {
        queryParams.append(key, event.queryStringParameters[key]);
      });

    // Add API key
    queryParams.set("api-key", NYT_API_KEY);

    // Construct the full NYT API URL
    // Ensure base URL doesn't have trailing slash and path starts correctly
    const baseUrl = NYT_API_BASE_URL.endsWith('/') ? NYT_API_BASE_URL.slice(0, -1) : NYT_API_BASE_URL;
    const pathPrefix = nytPath.startsWith('/') ? nytPath.slice(1) : nytPath;
    const nytUrl = `${baseUrl}/${pathPrefix}?${queryParams.toString()}`;

    console.log('Fetching from NYT API:', nytUrl.replace(/api-key=[^&]+/, 'api-key=***'));

    // Make request to NYT API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(nytUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('NYT API error:', response.status, errorText);
        return {
          statusCode: response.status,
          headers,
          body: JSON.stringify({
            error: 'NYT API request failed',
            status: response.status,
            message: errorText
          }),
        };
      }

      const data = await response.json();

    // Return the response
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data),
    };
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('Request timeout');
        return {
          statusCode: 504,
          headers,
          body: JSON.stringify({
            error: 'Request timeout',
            message: 'The NYT API request took too long'
          }),
        };
      }
      throw fetchError;
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
        cause: error.cause?.message || undefined
      }),
    };
  }
};

