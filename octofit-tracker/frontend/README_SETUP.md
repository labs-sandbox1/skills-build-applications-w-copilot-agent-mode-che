# OctoFit Tracker - Frontend Setup

## Manual Step Required

Please copy the logo file manually:

```bash
cp docs/octofitapp-small.png octofit-tracker/frontend/src/octofitapp-small.png
```

Or you can do this through the VS Code file explorer:
1. Navigate to `docs/octofitapp-small.png`
2. Copy the file
3. Paste it into `octofit-tracker/frontend/src/`

## Environment Variables

Create a `.env` file in the `octofit-tracker/frontend` directory with:

```env
REACT_APP_CODESPACE_NAME=your-codespace-name
```

To get your codespace name, check your codespace URL. It will be in the format:
`https://your-codespace-name-8000.app.github.dev`

## Running the Application

1. Install dependencies (if not already done):
   ```bash
   npm install --prefix octofit-tracker/frontend
   ```

2. Start the development server:
   ```bash
   npm start --prefix octofit-tracker/frontend
   ```

The application will open on port 3000.

## Components

- **Home** - Welcome page with overview
- **Users** - List of all users
- **Teams** - List of all teams
- **Activities** - Activity tracking and history
- **Workouts** - Workout suggestions
- **Leaderboard** - Competition rankings
