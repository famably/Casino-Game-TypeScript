# Match Pairs

## 1. How to run
1. Install dependencies:
    ```bash
    npm install
    ```

2. Start development server:
    ```bash
    npm run dev
    ```
   The game will automatically open in your browser at http://localhost:9000.

3. Build for production:
    ```bash
    npm run build
    ```

## 2. Explanation about the UI elements
The game follows all the original requirements and provides a complete casino-style card matching experience.

- Balance: Starts at 1000, decreases by 10 for each failed match
- Winnings: Increases by 50 for each successful match, resets to 0 on failed match
- Saved Winnings: Accumulates winnings when game is won
- History: Shows the last 5 results (WIN/LOSE with card symbol)
- Lose/Win: Shows current result (turns green for WIN, red for LOSE)
- Last Card: Shows the symbol of the last card flipped

## Requirements
You are tasked with recreating a match pairs game.

This project contains a basic framework for creating a game using the two main libraries we use [Pixijs](https://pixijs.com/8.x/examples) & [gsap](https://gsap.com/docs/v3/).

**Note:** You are welcome to modify this project structure or use alternative technologies if you're more comfortable with them. For example, you may prefer to use TypeScript, or any other framework/library you're more familiar with.

## Setup
The project contains a `index.html` which imports the two libraries and sets your entry point to the project as `src/index.js` `init()` this is where you should begin your task.

A basic graphics sheet has been provided in `assets` which contains the cards you may choose to use, as well as some other graphics.

To run the `index.html` file you will require a webserver or use one of the following methods.

If using VS Code you can install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plugin.

If using WebStorm this functionality is built in, documentation can be found [here](https://www.jetbrains.com/help/webstorm/running-applications.html)

## Game Requirements
The game should play as detailed below, add as much additional animation and flare as you wish, to make the game an enjoyable experiance.

### Game layout
- There must be at least 16 cards.
- All 4 card suits must be used.
- Cards should start by showing their back.

### Game Play
- Once a card is clicked, it should show the card face.
- After the second card is clicked, a check should be run to see if they matched.
- Each card should match all others of the same suit.
- If the cards match, the user should be informed of a successful match.
- If the cards do not match, the cards should reset to showing their back.
- A counter should be visible, informing the user how many times they have attempted a match.

### End condition
The game should end when all cards have been matched.

### Restart
The game should be replayable as many times as the user wishes.
