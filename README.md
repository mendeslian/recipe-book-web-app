# Recipe Book Web App

A modern web application built with Next.js and TypeScript for browsing and searching recipes.

## Features

- Responsive design with mobile support
- Recipe search functionality
- Filter recipes by:
  - Ingredients
  - Country/Area
  - Category
- Dynamic page titles
- Loading states and error handling
- Grid layout for recipe display

## Tech Stack

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- State Management: React Hooks

## Prerequisites

Before running this project, ensure you have:

- Node.js (Latest LTS version recommended)
- npm or yarn
- The Recipe Book Server running (backend API)

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
```

2. Navigate to the project directory:

```bash
cd recipe-book-web-app
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

## Running the Application

### Development Mode

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser to see the application.

### Production Build

Create a production build:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
├── components/      # Reusable UI components
│   └── RecipeCard   # Recipe card component
├── pages/           # Next.js pages
│   └── recipes/     # Recipe-related pages
├── services/        # API services
├── types/           # TypeScript type definitions
└── styles/          # Global styles
```

## Features in Detail

### Recipe List Page

- Search Filters:

  - Ingredient-based search
  - Country/Area-based filtering
  - Category-based filtering
  - Only one filter can be active at a time

- Responsive Design:

  - Adapts to different screen sizes
  - Mobile-friendly interface
  - Grid layout adjusts columns based on viewport

- User Interface:
  - Loading states with animations
  - Clear error messages
  - Dynamic result count
  - Clear filters option

## License

This project is licensed under the terms of the license file included in the repository.
