# Netlify Functions - API Proxy

This directory contains Netlify serverless functions that securely proxy requests to the NYT Books API.

## 🔒 Security

The API key is stored as a Netlify environment variable and is never exposed to the client. All requests go through the serverless function which adds the API key server-side.

## 📁 Structure

- `netlify/functions/api-proxy.js` - Main serverless function that proxies NYT API requests

## 🔧 Configuration

### Setting the API Key in Netlify

1. **Via Netlify Dashboard:**
   - Go to your site → Site settings → Environment variables
   - Click "Add a variable"
   - Name: `NYT_API_KEY`
   - Value: Your NYT API key
   - Scope: All scopes (or specific scopes as needed)

2. **Via Netlify CLI:**
   ```bash
   netlify env:set NYT_API_KEY "your-api-key-here"
   ```

## 🚀 Local Development

To test the functions locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# From project root, run Netlify Dev
netlify dev
```

This will start:
- Your React app on `http://localhost:8888`
- Netlify Functions on `http://localhost:8888/.netlify/functions/`

## 📡 Function Endpoint

- **URL:** `/.netlify/functions/api-proxy`
- **Method:** GET
- **Query Parameter:** `path` - The NYT API endpoint path (e.g., `names.json`, `overview.json?published_date=2024-01-01`)

### Example Requests

```
/.netlify/functions/api-proxy?path=names.json
/.netlify/functions/api-proxy?path=overview.json?published_date=2024-01-01
/.netlify/functions/api-proxy?path=current/hardcover-fiction.json
```

