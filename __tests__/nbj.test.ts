import { playGame } from '../src/nbj';
import type { CardType } from '../src/nbj';


test('Player 1 wins with a blackjack', () => {

  const deck: CardType[] = [
    { suit: "SPADES", value: "Q" },
    { suit: "CLUBS", value: "J" },
    { suit: "HEARTS", value: "A" },
    { suit: "DIAMONDS", value: "K" },
  ];

  const [winner, player1Cards, player2Cards] = playGame("Truls", "Magnus", [...deck]);
  expect(winner).toBe("Truls");
  expect(player1Cards.length).toBe(2);
  expect(player2Cards.length).toBe(2);
});

test('Player 2 wins with a blackjack', () => {
  const deck: CardType[] = [
    { suit: "HEARTS", value: "A" },
    { suit: "DIAMONDS", value: "K" },
    { suit: "SPADES", value: "Q" },
    { suit: "CLUBS", value: "J" },
  ];
  const [winner, player1Cards, player2Cards] = playGame("Truls", "Magnus", [...deck]);
  expect(winner).toBe("Magnus");
  expect(player1Cards.length).toBe(2);
  expect(player2Cards.length).toBe(2);
});

test('Player 2 wins with points', () => {
  const deck: CardType[] = [
    { suit: "HEARTS", value: "7" },
    { suit: "DIAMONDS", value: "8" },
    { suit: "SPADES", value: "7" },
    { suit: "CLUBS", value: "8" },
    { suit: "SPADES", value: "Q" },
    { suit: "CLUBS", value: "J" },
  ];
  const [winner, player1Cards, player2Cards] = playGame("Truls", "Magnus", [...deck]);
  expect(winner).toBe("Magnus");
  expect(player1Cards.length).toBeGreaterThan(2);
  expect(player2Cards.length).toBe(2);

});

test('No winner', () => {
  const deck: CardType[] = [
    { suit: "HEARTS", value: "5" },
    { suit: "DIAMONDS", value: "10" },
    { suit: "SPADES", value: "7" },
    { suit: "CLUBS", value: "8" },
    { suit: "SPADES", value: "4" },
    { suit: "CLUBS", value: "4" },
  ];
  const [winner, player1Cards, player2Cards] = playGame("Truls", "Magnus", [...deck]);
  expect(winner).toBeUndefined;
  expect(player1Cards.length).toBe(3);
  expect(player2Cards.length).toBe(3);
});