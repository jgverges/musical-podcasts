# Musical Podcasts

This project is a mini-application for listening to musical podcasts. It is built with React, TanStack Query, TypeScript, and Webpack from scratch.

- The application is designed to be a Single Page Application (SPA) with client-side navigation.
- Error handling is minimal and only logged to the browser console.

## Features

The project `musical-podcasts` hass three main views:

- **MainView**: Main view who displays the list of the top 100 most popular podcasts.
- **Podcast Details**: Shows detailed information about a podcast and its episodes.
- **Episode Details**: Displays detailed information about an episode, including a basic audio player.

### Structure

The project is structured into separate layers for domain, services, infrastructure, and presentation

````
src
.
├── App.tsx
├── application
│   ├── services
│   └── stores
├── domain
│   ├── entities
│   ├── index.ts
│   └── interfaces
├── index.tsx
├── infraestructure
│   ├── api
│   ├── mappers
│   └── repositories
├── presentation
│   ├── EpisodeDetails
│   ├── MainView
│   ├── PodcastDetail
│   └── common
└── styles
```
## Running the Application

### Requirements

- Node.js (v20.x or higher) and npm based on the Node.js version.

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/jgverges/musical-podcasts.git
```

2. **Install dependencies**:

```bash
npm install
```

### Development Mode

3. **Start the development server**:

```bash
npm run start
```

4. **Open the application**:

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

### Production Mode

- Make sure you have followed the steps up to step 2.

```

npm run build

```

3. This will generate a `dist` folder with concatenated and minified assets.
4. The generated files in the `dist` folder can be deployed to any web server to be run in production mode.

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm test`: Run unit tests.

## External APIs

- [Top 100 Podcasts](https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json)
- [Podcast Details](https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20)


````
