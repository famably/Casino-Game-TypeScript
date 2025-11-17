# Match Pairs — Card Matching Game (PixiJS + GSAP)

## Overview
This repository contains an interactive card-matching game built with **PixiJS** and **GSAP**, designed to deliver a polished, casino-style user experience.  
The project includes animations, scoring logic, persistent history tracking, and a fully replayable game loop.  
It is structured as a standalone front-end mini-game that can be extended or integrated into larger gaming or entertainment applications.

## Features

- **Interactive Card Matching Gameplay**  
  Fully animated card flips, smooth transitions, and a responsive layout powered by PixiJS and GSAP.

- **Casino-Inspired Reward System**  
  - Balance starts at **1000**  
  - **−10** for failed matches  
  - **+50** for successful matches  
  - Winnings reset on failure  
  - Saved winnings accumulate after each completed game  

- **Match History Tracking**  
  Displays the last 5 game outcomes (WIN/LOSE + card symbol).

- **Real-Time Game Indicators**  
  - Live “Win/Lose” status  
  - Last flipped card symbol  
  - Attempt counter  

- **Replayable Game Loop**  
  Full restart support and consistent scoring logic.

- **Extensible Architecture**  
  Built to allow additional levels, themes, animations, and more card logic in future versions.

## Tech Stack

| Component | Technology |
|----------|------------|
| Rendering Engine | **PixiJS** |
| Animation | **GSAP** |
| Build Tools | Vite (via npm scripts) |
| Language | JavaScript (ES Modules) |
| Assets | Custom sprite sheet + card graphics |

## Running the Project

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
The game will automatically open at:  
**http://localhost:9000**

### 3. Build for production
```bash
npm run build
```

## UI & Game Elements

### Core Player Feedback
- **Balance**: Starts at 1000, decreases on failed matches  
- **Winnings**: Increases on matches, resets on mismatch  
- **Saved Winnings**: Added to total after winning a round  
- **History Panel**: Shows last 5 outcomes  
- **Match Indicator**: Green = match, red = mismatch  
- **Last Card Reveal**: Displays the last opened card  

### Gameplay Rules
- At least **16 cards**, using **all 4 suits**  
- Cards start face-down  
- Clicking reveals a card  
- Two revealed cards trigger match check  
- Cards of the same **suit** count as a match  
- Successful matches remain face-up  
- Failed matches flip back  
- Attempts counter increments each round  
- Game ends when all cards are matched  

## Project Structure

```
/src
  index.js
  game/
    card.js
    gameManager.js
    uiManager.js
/assets
  cards.png
  spritesheet.json
index.html
vite.config.js
README.md
```

## Extending the Game

This project is structured for growth:

- Add difficulty levels  
- Add card themes or seasonal skins  
- Connect to a backend for leaderboards  
- Add sound effects and richer animation sequences  
- Implement mobile-optimized layouts  
- Introduce timed challenges or combo scoring  

## Summary
This repository showcases a complete, production-ready card matching game powered by PixiJS and GSAP.  
With clean architecture, polished UI elements, and a replayable loop, the game serves as both a standalone experience and a foundation for further expansion into more advanced interactive content.
