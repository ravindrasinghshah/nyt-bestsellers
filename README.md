# NYT Bestsellers

A modern React web application that displays New York Times Best Seller books using the NYT Books API. This application provides users with an intuitive interface to browse, search, and explore current and historical bestseller lists.

## 🚀 Features

- **Bestseller Lists**: Browse current bestseller lists by category (Fiction, Non-Fiction, etc.)
- **Top 5 Books**: View the top 5 bestselling books across all categories
- **Book Details**: Detailed information about each book including cover, description, and purchase links
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **Social Sharing**: Share book recommendations on social media platforms
- **Historical Data**: Access to historical bestseller data

## ⚡ Quick Start

Want to get started quickly? Here's the fastest path:

```bash
# 1. Clone and setup
git clone https://github.com/yourusername/nyt-bestsellers.git
cd nyt-bestsellers/ClientApp

# 2. Install dependencies
npm install

# 3. Get NYT API key from https://developer.nytimes.com/
# 4. Create .env file with: REACT_APP_ApiKey=your_key_here

# 5. Start developing!
npm start
```

That's it! The app will open at `http://localhost:3000`. For detailed setup instructions, see [Getting Started](#-getting-started) below.

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
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   ├── BestSellers.js
│   │   │   ├── Book.js
│   │   │   └── ...
│   │   ├── http/            # API service layer
│   │   │   ├── base.js      # HTTP client configuration
│   │   │   └── service.js   # API service methods
│   │   ├── common/          # Shared utilities
│   │   │   └── config.js    # Application configuration
│   │   ├── context/         # React context providers
│   │   └── svg/             # SVG assets
│   ├── netlify/              # Netlify serverless functions
│   │   ├── functions/
│   │   │   └── api-proxy.js # Secure API proxy function
│   │   └── README.md        # Functions documentation
│   ├── package.json
│   ├── netlify.toml         # Netlify configuration
│   └── tailwind.config.js   # Tailwind CSS configuration
├── RestAPIs/                # API documentation and testing
│   └── Books.http          # HTTP request examples
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** - [Download Git](https://git-scm.com/)
- **NYT Books API Key** (free) - Get one at [NYT Developer Portal](https://developer.nytimes.com/)

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/nyt-bestsellers.git

# Navigate to the project directory
cd nyt-bestsellers
```

#### 2. Get Your NYT API Key

1. Visit the [NYT Developer Portal](https://developer.nytimes.com/)
2. Sign up for a free account (if you don't have one)
3. Go to "Apps" and create a new app
4. Select the "Books API" product
5. Copy your API key (you'll need it in the next step)

#### 3. Configure Environment Variables

Create a `.env` file in the `ClientApp` directory:

```bash
cd ClientApp
touch .env  # On Windows: type nul > .env
```

Add your API key to the `.env` file:

```env
REACT_APP_ApiKey=your_nyt_api_key_here
```

> **Important:** 
> - Never commit the `.env` file to version control (it's already in `.gitignore`)
> - This API key is only used for local development
> - In production, the API key is secured in Netlify Functions and never exposed to clients

#### 4. Install Dependencies

```bash
# Make sure you're in the ClientApp directory
cd ClientApp

# Install all project dependencies
npm install
```

This will install all required packages including React, Tailwind CSS, and other dependencies.

#### 5. Start the Development Server

```bash
npm start
```

The application will:
- Open in your default browser at `http://localhost:3000`
- Automatically reload when you make changes
- Show linting errors in the console

You should see the NYT Bestsellers homepage! 🎉

#### 6. Verify Installation

- The app should load without errors
- You should see bestseller lists and books
- If you see errors, check the [Troubleshooting](#-troubleshooting) section below

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --watchAll=false
```

### Building for Production

```bash
# Create an optimized production build
npm run build

# The build folder will contain the production-ready files
```

## 🚀 Deployment

### Deploy to Netlify

#### Option 1: Deploy via Netlify Dashboard (Recommended for beginners)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub repository

3. **Configure Build Settings**
   - Base directory: `ClientApp`
   - Build command: `npm run build`
   - Publish directory: `ClientApp/build`

4. **Add Environment Variable**
   - Go to Site settings → Environment variables
   - Add new variable:
     - Key: `NYT_API_KEY`
     - Value: Your NYT API key

5. **Deploy!**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your app

#### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
cd ClientApp
netlify init
netlify deploy --prod
```

**Important:** Make sure to set the `NYT_API_KEY` environment variable in Netlify:
- Go to your site settings → Environment variables
- Add `NYT_API_KEY` with your API key value

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

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We love your input! We want to make contributing to NYT Bestsellers as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

### Development Workflow

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/yourusername/nyt-bestsellers.git
cd nyt-bestsellers

# Add the original repository as upstream
git remote add upstream https://github.com/originalowner/nyt-bestsellers.git
```

#### 2. Create a Branch

```bash
# Create a new branch for your feature/fix
# Use a descriptive name that indicates what you're working on
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `style/` - Formatting, missing semicolons, etc.

#### 3. Make Your Changes

- Write clean, readable code
- Follow the existing code style (see [Code Standards](#code-standards) below)
- Add comments for complex logic
- Update documentation if needed
- Add tests for new features

#### 4. Test Your Changes

```bash
# Run tests to ensure nothing is broken
npm test

# Test the build
npm run build

# Make sure the app runs correctly
npm start
```

#### 5. Commit Your Changes

Write clear, meaningful commit messages:

```bash
git add .
git commit -m "Add feature: implement dark mode toggle"
```

**Commit message guidelines:**
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests after the first line
- Example:
  ```
  Fix: resolve API timeout issue
  
  The timeout was occurring due to missing error handling.
  Added try-catch block and timeout configuration.
  
  Fixes #123
  ```

#### 6. Keep Your Branch Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Rebase your branch on top of the latest main branch
git rebase upstream/main
```

#### 7. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then:
1. Go to the original repository on GitHub
2. You'll see a banner suggesting to create a Pull Request
3. Click "Compare & pull request"
4. Fill out the PR template (see below)

### Code Standards

#### JavaScript/React Style

- Use **functional components** with hooks (no class components)
- Follow **ES6+** syntax
- Use meaningful variable and function names
- Keep components small and focused (single responsibility)
- Extract reusable logic into custom hooks
- Use **arrow functions** for component definitions

**Example:**
```javascript
// ✅ Good
const BookCard = ({ book, onSelect }) => {
  const handleClick = () => {
    onSelect(book);
  };

  return (
    <div onClick={handleClick} className="book-card">
      <h3>{book.title}</h3>
    </div>
  );
};

// ❌ Avoid
const BookCard = ({book, onSelect}) => {
  return <div onClick={() => onSelect(book)}><h3>{book.title}</h3></div>
}
```

#### Tailwind CSS Guidelines

- Use Tailwind utility classes instead of custom CSS when possible
- Group related classes logically
- Use responsive prefixes (`sm:`, `md:`, `lg:`) appropriately
- Keep custom CSS in `index.css` minimal

#### File Organization

- One component per file
- Use PascalCase for component file names: `BookCard.js`
- Use camelCase for utility files: `formatDate.js`
- Keep related files grouped in directories

#### Import Organization

```javascript
// 1. React and third-party libraries
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

// 2. Local components
import Header from '../components/Header';
import Loading from '../components/Loading';

// 3. Utilities and configs
import { formatDate } from '../common/utils';
import { API_BASE_URL } from '../common/config';

// 4. Styles (if needed)
import './Book.css';
```

### Pull Request Guidelines

#### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated (if needed)
- [ ] Tests pass locally
- [ ] No console errors or warnings
- [ ] Changes tested in multiple browsers (if UI changes)

#### PR Template

When creating a Pull Request, include:

1. **Description**: What does this PR do? Why?
2. **Type of Change**:
   - Bug fix
   - New feature
   - Breaking change
   - Documentation update
3. **Testing**: How was this tested?
4. **Screenshots** (if UI changes): Before/after images
5. **Checklist**: Confirm all items are checked

#### PR Title Format

```
[Type] Brief description (e.g., "Fix: Resolve API timeout issue")
```

Types: `Fix`, `Feature`, `Docs`, `Refactor`, `Test`, `Style`

### Reporting Issues

Found a bug? Have a feature request? Follow these guidelines:

#### Bug Reports

1. **Check existing issues** - Make sure the bug hasn't been reported
2. **Create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots (if applicable)
   - Environment info (OS, browser, Node version)
   - Error messages or logs

#### Feature Requests

1. **Check existing issues** - See if the feature was already requested
2. **Create a new issue** with:
   - Clear description of the feature
   - Why it would be useful
   - Potential implementation ideas (optional)
   - Any alternatives considered

### Questions?

- Open an issue for discussion
- Check existing issues and discussions
- Review the codebase and documentation

### Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Be kind, constructive, and professional in all interactions.

### Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md (coming soon)
- Release notes
- Project documentation

Thank you for contributing to NYT Bestsellers! 🎉

## 🔧 Troubleshooting

### Common Issues and Solutions

#### API Key Not Working

**Problem:** App loads but no books are displayed, or you see API errors.

**Solutions:**
1. Verify your API key is correct in `.env` file
2. Check that the `.env` file is in the `ClientApp` directory (not root)
3. Ensure the API key variable is named exactly `REACT_APP_ApiKey`
4. Restart the development server after adding/changing the `.env` file
5. Check the NYT Developer Portal to ensure your API key is active

#### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Option 1: Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Option 2: Use a different port
PORT=3001 npm start
```

#### Module Not Found Errors

**Problem:** `Module not found: Can't resolve '...'`

**Solutions:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s node_modules && del package-lock.json  # Windows

# Reinstall dependencies
npm install
```

#### Build Fails

**Problem:** `npm run build` fails with errors

**Solutions:**
1. Check for syntax errors in your code
2. Ensure all imports are correct
3. Verify environment variables are set
4. Clear the build directory: `rm -rf build` then rebuild
5. Check Node.js version: `node --version` (should be v14+)

#### Tailwind Styles Not Working

**Problem:** Tailwind utility classes not applying

**Solutions:**
1. Ensure Tailwind is properly configured in `tailwind.config.js`
2. Check that `index.css` imports Tailwind directives
3. Restart the development server
4. Clear browser cache

#### CORS Errors

**Problem:** CORS errors when making API requests

**Solutions:**
- In development, this shouldn't occur if using the `.env` variable
- If using Netlify Functions, ensure they're properly configured
- Check that the API proxy function is correctly set up

#### Netlify Deployment Issues

**Problem:** Build fails on Netlify

**Solutions:**
1. Verify build settings in Netlify dashboard
2. Check that base directory is set to `ClientApp`
3. Ensure `NYT_API_KEY` environment variable is set
4. Review build logs for specific error messages
5. Test build locally: `npm run build`

### Getting Help

If you're still experiencing issues:

1. **Search existing issues** - Your problem might already be reported
2. **Check the logs** - Browser console and terminal output
3. **Create a new issue** with:
   - Description of the problem
   - Steps to reproduce
   - Error messages
   - Environment details (OS, Node version, browser)
   - Screenshots (if applicable)

## 📞 Support

### Resources

- **NYT Books API Documentation**: [Developer Portal](https://developer.nytimes.com/docs/books-product/1/overview)
- **API Examples**: Check `RestAPIs/Books.http` for request examples
- **React Documentation**: [React Docs](https://react.dev/)
- **Tailwind CSS Docs**: [Tailwind CSS](https://tailwindcss.com/docs)

### Getting Help

- **GitHub Issues**: Open an issue for bugs, feature requests, or questions
- **Discussions**: Use GitHub Discussions for general questions and ideas
- **Code Review**: Submit a Pull Request for code review and feedback

### Reporting Problems

When reporting issues, please include:

1. **What you're trying to do**
2. **What you expected to happen**
3. **What actually happened**
4. **Steps to reproduce** (if it's a bug)
5. **Environment information**:
   - Operating System
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Browser and version (if relevant)

This information helps us understand and fix issues faster!

## 🔄 Version History

- **v0.1.0** - Initial release with basic bestseller browsing functionality
- React 17.0.2 with modern hooks and functional components
- Tailwind CSS for styling
- NYT Books API v3 integration
