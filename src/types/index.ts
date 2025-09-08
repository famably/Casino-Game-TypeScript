export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export interface CardData {
  id: number;
  suit: Suit;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameConfig {
  rows: number;
  cols: number;
  cardWidth: number;
  cardHeight: number;
  spacing: number;
}