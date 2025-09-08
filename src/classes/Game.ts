import { Card } from './Card';
import { Suit } from '../types';

export class Game {
  private attempts: number = 0;
  private matchedPairs: number = 0;
  private flippedCards: Card[] = [];
  private cards: Card[] = [];
  private balance: number = 1000;
  private winnings: number = 0;
  private savedWinnings: number = 0;
  private history: string[] = [];
  
  private attemptsElement: HTMLElement;
  private restartButton: HTMLButtonElement;
  private gameBoard: HTMLElement;
  private balanceElement: HTMLElement;
  private winningsElement: HTMLElement;
  private savedWinningsElement: HTMLElement;
  private historyElement: HTMLElement;
  private resultElement: HTMLElement;
  private lastCardElement: HTMLElement;

  constructor() {
    this.attemptsElement = document.getElementById('attempts') as HTMLElement;
    this.restartButton = document.getElementById('restart') as HTMLButtonElement;
    this.gameBoard = document.getElementById('game-board') as HTMLElement;
    this.balanceElement = document.getElementById('balance') as HTMLElement;
    this.winningsElement = document.getElementById('winnings') as HTMLElement;
    this.savedWinningsElement = document.getElementById('saved-winnings') as HTMLElement;
    this.historyElement = document.getElementById('history') as HTMLElement;
    this.resultElement = document.getElementById('lose-win') as HTMLElement;
    this.lastCardElement = document.getElementById('last-card') as HTMLElement;
    
    this.restartButton.addEventListener('click', () => this.restart());
    
    this.initializeGame();
    this.updateUI();
  }
  
  private initializeGame(): void {
    // Create cards (4 suits, 4 cards each = 16 cards total)
    const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
    let id = 0;
    
    // Create 4 cards for each suit
    suits.forEach(suit => {
      for (let i = 0; i < 4; i++) {
        this.cards.push(new Card(suit, i + 1, id));
        id++;
      }
    });
    
    // Shuffle cards
    this.shuffleCards();
    
    // Add cards to board
    this.cards.forEach(card => {
      card.onFlip = (flippedCard: Card) => this.handleCardFlip(flippedCard);
      this.gameBoard.appendChild(card.element);
    });
  }
  
  private shuffleCards(): void {
    // Fisher-Yates shuffle algorithm
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  
  private handleCardFlip(card: Card): void {
    // Prevent clicking if two cards are already flipped
    if (this.flippedCards.length >= 2) {
      return;
    }
    
    // Flip the card visually
    card.flip();
    this.flippedCards.push(card);
    
    // Update last card display
    this.lastCardElement.textContent = card.getSymbol();
    
    if (this.flippedCards.length === 2) {
      this.attempts++;
      this.updateAttempts();
      
      const [card1, card2] = this.flippedCards;
      
      // Check if cards match (same suit)
      if (card1.data.suit === card2.data.suit) {
        // Match found - update winnings
        this.winnings += 50;
        this.resultElement.textContent = 'WIN';
        this.resultElement.style.color = '#27AE60';
        
        card1.markMatched();
        card2.markMatched();
        this.matchedPairs++;
        
        // Add to history
        this.addToHistory('WIN', card1.getSymbol());
        
        this.flippedCards = [];
        
        // Check if all pairs are matched (8 pairs total)
        if (this.matchedPairs === 8) {
          setTimeout(() => this.showWinMessage(), 500);
        }
      } else {
        // No match - update balance and winnings
        this.balance -= 10;
        this.winnings = 0;
        this.resultElement.textContent = 'LOSE';
        this.resultElement.style.color = '#E74C3C';
        
        // Add to history
        this.addToHistory('LOSE', card1.getSymbol());
        
        // Flip back after delay
        setTimeout(() => {
          card1.unflip();
          card2.unflip();
          this.flippedCards = [];
          this.resultElement.textContent = 'LOSE/WIN';
          this.resultElement.style.color = 'white';
        }, 1000);
      }
      
      this.updateUI();
    }
  }
  
  private addToHistory(result: string, card: string): void {
    this.history.push(`${result}: ${card}`);
    if (this.history.length > 5) {
      this.history.shift();
    }
    
    // Update history display
    this.historyElement.innerHTML = '';
    this.history.forEach(item => {
      const historyItem = document.createElement('div');
      historyItem.textContent = item;
      historyItem.style.color = item.startsWith('WIN') ? '#27AE60' : '#E74C3C';
      historyItem.style.marginBottom = '2px';
      this.historyElement.appendChild(historyItem);
    });
  }
  
  private updateAttempts(): void {
    this.attemptsElement.textContent = `Attempts: ${this.attempts}`;
  }
  
  private updateUI(): void {
    this.balanceElement.textContent = this.balance.toString();
    this.winningsElement.textContent = this.winnings.toString();
    this.savedWinningsElement.textContent = this.savedWinnings.toString();
  }
  
  private showWinMessage(): void {
    // Save winnings
    this.savedWinnings += this.winnings;
    this.updateUI();
    
    const winMessage = document.createElement('div');
    winMessage.className = 'win-message';
    winMessage.innerHTML = `
      <h2>Congratulations! You Won!</h2>
      <p>You found all pairs in ${this.attempts} attempts!</p>
      <p>Total Winnings: ${this.winnings}</p>
      <button id="play-again">Play Again</button>
    `;
    
    document.body.appendChild(winMessage);
    
    const playAgainButton = document.getElementById('play-again') as HTMLButtonElement;
    playAgainButton.addEventListener('click', () => {
      document.body.removeChild(winMessage);
      this.restart();
    });
  }
  
  private restart(): void {
    // Reset game state
    this.attempts = 0;
    this.matchedPairs = 0;
    this.flippedCards = [];
    this.balance = 1000;
    this.winnings = 0;
    this.history = [];
    
    this.updateAttempts();
    this.updateUI();
    
    // Reset result display
    this.resultElement.textContent = 'LOSE/WIN';
    this.resultElement.style.color = 'white';
    
    // Reset last card display
    this.lastCardElement.textContent = '?';
    
    // Clear history
    this.historyElement.innerHTML = '';
    
    // Clear the game board
    while (this.gameBoard.firstChild) {
      this.gameBoard.removeChild(this.gameBoard.firstChild);
    }
    
    // Reset all cards
    this.cards.forEach(card => card.reset());
    
    // Reshuffle cards
    this.shuffleCards();
    
    // Add cards back to board
    this.cards.forEach(card => {
      this.gameBoard.appendChild(card.element);
    });
  }
}