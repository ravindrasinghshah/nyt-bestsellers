# NYT Bestsellers

A modern React web application that displays New York Times Best Seller books using the NYT Books API. This application provides users with an intuitive interface to browse, search, and explore current and historical bestseller lists.

## 🚀 Features

- **Bestseller Lists**: Browse current bestseller lists by category (Fiction, Non-Fiction, etc.)
- **Top 5 Books**: View the top 5 bestselling books across all categories
- **Book Details**: Detailed information about each book including cover, description, and purchase links
- **Search & Filter**: Find books by category and date
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **Social Sharing**: Share book recommendations on social media platforms
- **Historical Data**: Access to historical bestseller data

## 🏗️ Architecture

### Frontend Stack
- **React 17.0.2** - Modern JavaScript library for building user interfaces
- **React Router DOM 6.2.2** - Client-side routing for single-page application
- **Tailwind CSS 3.0.23** - Utility-first CSS framework for rapid UI development
- **React Icons 4.3.1** - Popular icon library for React applications
- **React Share 4.4.0** - Social media sharing functionality
- **React Toastify 8.2.0** - Toast notifications
- **Moment.js 2.29.1** - Date manipulation and formatting

### Backend Stack
- **Netlify Functions** - Serverless functions for secure API proxy
- **Node.js 18+** - Server runtime environment (native fetch support)

### API Integration
- **NYT Books API v3** - Official New York Times Books API
- **Secure Backend Proxy** - API key secured in Netlify Functions, never exposed to client
- **RESTful Architecture** - Clean API service layer with centralized HTTP client

### Project Structure
```
nyt-bestsellers/
├── ClientApp/                 # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── AboutUs.js
│   │   │   ├── Banner.js
│   │   │   ├── BestSellers.js
│   │   │   ├── Book.js
│   │   │   ├── Header.js
│   │   │   ├── Home.js
│   │   │   ├── Loading.js
│   │   │   ├── Search.js
│   │   │   └── ...
│   │   ├── http/            # API service layer
│   │   │   ├── base.js      # HTTP client configuration
│   │   │   └── service.js   # API service methods
│   │   ├── common/          # Shared utilities
│   │   │   └── config.js    # Application configuration
│   │   └── svg/             # SVG assets
│   ├── package.json
│   └── tailwind.config.js
├── netlify/                  # Netlify serverless functions
│   └── functions/
│       └── api-proxy.js     # Secure API proxy function
├── netlify.toml             # Netlify configuration
├── RestAPIs/                # API documentation and testing
│   └── Books.http          # HTTP request examples
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- NYT Books API key

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nyt-bestsellers
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd ClientApp
   npm install
   ```

3. **Environment Configuration**

   **Get NYT API Key**
   - Visit [NYT Developer Portal](https://developer.nytimes.com/)
   - Sign up for a free account
   - Create a new app to get your API key

4. **Start Development (Local)**
   
   For local development, you can use Netlify Dev which runs the functions locally:
   ```bash
   # Install Netlify CLI globally (if not already installed)
   npm install -g netlify-cli
   
   # From the project root, start Netlify Dev
   netlify dev
   ```
   
   Or use the React development server (functions will work in production):
   ```bash
   cd ClientApp
   npm start
   ```

5. **Deploy to Netlify**

   **Option 1: Deploy via Netlify Dashboard**
   1. Push your code to GitHub/GitLab/Bitbucket
   2. Connect your repository to Netlify
   3. Set build settings:
      - Base directory: `ClientApp`
      - Build command: `npm run build`
      - Publish directory: `ClientApp/build`
   4. Add environment variable:
      - Go to Site settings → Environment variables
      - Add `NYT_API_KEY` with your API key value
   5. Deploy!

   **Option 2: Deploy via Netlify CLI**
   ```bash
   # Install Netlify CLI (if not already installed)
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   netlify deploy --prod
   ```
   
   **Important:** Make sure to set the `NYT_API_KEY` environment variable in Netlify:
   - Go to your site settings → Environment variables
   - Add `NYT_API_KEY` with your API key

6. **Build for production**
   ```bash
   cd ClientApp
   npm run build
   ```

## 📱 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔧 API Endpoints

The application integrates with the following NYT Books API endpoints:

- **List Names**: `/names.json` - Get available bestseller list names
- **Current Lists**: `/current/{list-name}.json` - Get current bestsellers by category
- **Overview**: `/overview.json` - Get top 5 books across all categories
- **Full Overview**: `/full-overview.json` - Get all books for all categories
- **History**: `/best-sellers/history.json` - Get bestseller history
- **By Date**: `/{date}/{category}.json` - Get books by specific date and category

## 🎨 UI/UX Features

- **Modern Design**: Clean, minimalist interface with custom color scheme
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and fallback states
- **Accessibility**: Built with accessibility best practices in mind

## 🔒 Security

### API Key Protection
- **Netlify Functions**: The NYT API key is stored securely in Netlify environment variables and never exposed to the client
- **Serverless Architecture**: API key is handled server-side in Netlify Functions, never in client code
- **No Client-Side Exposure**: The API key is never included in URLs, network requests, or bundled JavaScript
- **Environment Variables**: API keys are stored in Netlify environment variables (never committed to git)

### Security Best Practices
- HTTPS-only API communication in production
- CORS enabled for controlled cross-origin requests
- Input validation and sanitization
- No sensitive data in client-side code or network logs
- Serverless functions run in isolated environments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Check the [NYT Books API documentation](https://developer.nytimes.com/docs/books-product/1/overview)
- Review the API examples in `RestAPIs/Books.http`
- Open an issue in the repository

## 🔄 Version History

- **v0.1.0** - Initial release with basic bestseller browsing functionality
- React 17.0.2 with modern hooks and functional components
- Tailwind CSS for styling
- NYT Books API v3 integration
