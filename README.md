# Musical Podcasts

This project is a mini-application for listening to musical podcasts. It is built with React, TanStack Query, TypeScript, and Webpack from scratch.

- The application is designed to be a Single Page Application (SPA) with client-side navigation.
- Error handling is minimal and only logged to the browser console.

## Features

The project `musical-podcasts` hass three main views:

- **PodcastList**: Main view who displays the list of the top 100 most popular podcasts.
- **Podcast Details**: Shows detailed information about a podcast and its episodes.
- **Episode Details**: Displays detailed information about an episode, including a basic audio player.

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

## Information Processing, Filtering, and Conversions

### Interpreted HTML Rendering

The description of the episodes sometimes contains HTML and should be displayed interpreted (not escaped). This is the default behavior of React when rendering, although treatment has been added to allow line breaks.

### JSON List Filtering

The podcast list API call returns a JSON with thousands of lines corresponding to the `PodcastListResponse` interface. This JSON is filtered to use only the minimum necessary information, using the `PodcastFiltered` interface instead of `PodcastI`.

### Render Treatments

- **Dates**: Rendered in a more readable format.

- **Milliseconds**: Converted to hours:minutes format.

- **Track Titles**: information has been filtered, removing the episode number.

- **Podcast Card Title** : Length Limitation to prevent overflow .

## Version Control

The project uses `git` and `GitHub` under the `conventional commit` protocol. It also includes explanatory `tags`.
