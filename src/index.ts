import './style.css';
import { Game } from './classes/Game';

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new Game();
});