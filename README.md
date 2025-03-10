# Modern Todo App

A simple Todo application built with React, TypeScript, and best practices. This application demonstrates the implementation of modern React patterns, efficient data management, and a great user experience using optimistic updates.

<div align="center" style="display: flex; justify-content: center; align-items: center; gap: 24px;">
  <a href="https://create-react-app.dev/">
    <img src="https://cdn.worldvectorlogo.com/logos/create-react-app.svg" width="80" alt="Create React App" style="display: block;" />
  </a>
  <a href="https://tanstack.com/query/latest">
    <img src="https://raw.githubusercontent.com/TanStack/query/main/media/emblem-light.svg" width="80" alt="React Query" style="display: block;" />
  </a>
  <a href="https://reactrouter.com/" style="display: flex; align-items: center;">
    <img src="https://reactrouter.com/_brand/React%20Router%20Brand%20Assets/React%20Router%20Logo/Light.png" width="80" height="45" alt="React Router" style="display: block;" />
  </a>
  <a href="https://styled-components.com/">
    <img src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" width="80" alt="Styled Components" style="display: block;" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" width="80" alt="TypeScript" style="display: block;" />
  </a>
</div>

<div align="center">
  <h3>Built With</h3>
  
  <a href="https://create-react-app.dev/">Create React App</a> •
  <a href="https://tanstack.com/query/latest">React Query</a> •
  <a href="https://reactrouter.com/">React Router</a> •
  <a href="https://styled-components.com/">Styled Components</a> •
  <a href="https://www.typescriptlang.org/">TypeScript</a>
</div>

## Features

- ✨ Modern React with TypeScript
- 🎨 Beautiful UI with styled-components
- 🔄 Real-time search with debouncing
- 📱 Responsive design
- 📊 Summary statistics
- 🔄 Optimistic updates
- 📄 Pagination support
- 🔍 URL-based search and pagination
- 🎯 Error boundaries and graceful degradation
- 🔄 Efficient data caching with React Query

## Tech Stack

- React 18
- TypeScript
- React Query (TanStack Query)
- React Router
- Styled Components
- Zod (Schema Validation)
- React Hot Toast
- React Error Boundary
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/syedad218/Todo-App.git
cd Todo-App
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.dist .env
```

Edit the `.env` file with your configuration.

4. Start the development server:

```bash
# Start the backend server
yarn start:server

# Look at the server.js file to see the custom server code

# In a new terminal, start the frontend
yarn start
```

## Development

### Available Scripts

- `yarn start` - Start the development server
- `yarn start:server` - Start the backend server
- `yarn test` - Run tests
- `yarn build` - Build for production

### Development Tools

The following development tools can be enabled by setting environment variables:

- React Query DevTools: Set `REACT_APP_QUERY_DEVTOOLS=true`
- React Scan: Set `REACT_APP_REACT_SCAN_ENABLED=true`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Custom React hooks, Utils & Constants
├── routes/        # Router configuration
├── styles/        # reusable styles like typography, button, theme, etc
├── types/         # TypeScript types
└── App.tsx        # Main application component
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
