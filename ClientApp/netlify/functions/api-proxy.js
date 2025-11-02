// Netlify serverless function to proxy NYT Books API requests
// This function keeps the API key secure on the server side

const NYT_API_BASE_URL = process.env.NYT_API_BASE_URL || 'https://api.nytimes.com/svc/books/v3/lists/';
const NYT_API_KEY = process.env.NYT_API_KEY;

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
    const nytUrl = `${NYT_API_BASE_URL}${nytPath}?${queryParams.toString()}`;

    // Make request to NYT API
    const response = await fetch(nytUrl);
    const data = await response.json();

    // Return the response
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Proxy error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};

