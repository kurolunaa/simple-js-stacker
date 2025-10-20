# simple-js-stacker
Legally distinct block stacker written in JS, with a leaderboard that has data persistence both on device and to a cloud JSON file.

# Features 
- **TRACK**: This will be a **game/entertainment** style of approach to a "thick-client" Single-Page Application (SPA).

<!-- # Screenshots/Demo Video -->

# Live Demo/Install & Run
You can play the game from this GitHub pages link here: [link]

Alternatively, you can clone the repo and run it using Node.js with the following commands: `npm i && npm run dev` or `npx http-server`

# How It Works
- **Rendering Stack**: This will use **Phaser** as a framework to help integrate the more game-focused features of this application.
- **Key Classes and Modules**: [don't know because no code yet]
- **Local-first Behavior**: Leaderboards and scores should persist after page refreshes. If no leaderboard exists, it should pull all highscores from the JSONbin. **Only high scores will be uploaded to the online leaderboards.**

# Data & Networking
- **Public GET**: Reads from a publically available JSONbin to load a cloud-based leaderboard, and store it into the device's local storage via the browser.
- **Cloud Based Leaderboard via JSONbin**: A device's highest score is uploaded to and compared against other scores on the JSONbin leaderboard.

A snippet of how that works:

```
code goes here but there is no code yet
```

<!-- # Configuration (Optional) -->

<!-- # License & Credits -->

<!-- # Developer Docs -->

