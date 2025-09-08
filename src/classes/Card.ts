import { CardData, Suit } from '../types';

export class Card {
  public data: CardData;
  public element: HTMLDivElement;
  private back: HTMLDivElement;
  private front: HTMLDivElement;
  public onFlip?: (card: Card) => void;

  constructor(suit: Suit, value: number, id: number) {
    this.data = {
      id,
      suit,
      value,
      isFlipped: false,
      isMatched: false
    };
    
    this.element = document.createElement('div');
    this.element.className = 'card';
    this.element.dataset.id = id.toString();
    this.element.dataset.suit = suit;
    
    this.back = document.createElement('div');
    this.back.className = 'back';
    this.back.textContent = '?';
    
    this.front = document.createElement('div');
    this.front.className = 'front';
    this.front.textContent = this.getSymbol();
    this.front.style.color = this.getColor();
    
    this.element.appendChild(this.back);
    this.element.appendChild(this.front);
    
    this.element.addEventListener('click', () => {
      if (!this.data.isFlipped && !this.data.isMatched) {
        // Don't flip here, just notify the game
        if (this.onFlip) {
          this.onFlip(this);
        }
      }
    });
  }
  
  public getSymbol(): string {
    return this.getSymbolPrivate();
  }
  
  private getSymbolPrivate(): string {
    switch (this.data.suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  }
  
  private getColor(): string {
    return this.data.suit === 'hearts' || this.data.suit === 'diamonds' ? '#FF0000' : '#000000';
  }
  
  public flip(): void {
    this.data.isFlipped = true;
    this.element.classList.add('flipped');
  }
  
  public unflip(): void {
    this.data.isFlipped = false;
    this.element.classList.remove('flipped');
  }
  
  public markMatched(): void {
    this.data.isMatched = true;
    this.element.classList.add('matched');
  }
  
  public reset(): void {
    this.data.isFlipped = false;
    this.data.isMatched = false;
    this.element.classList.remove('flipped', 'matched');
  }
}