import { number, z } from "zod"

const value = z.enum(["2","3","4","5","6","7","8","9","10","J","Q","K","A"]);
const card = z.object({
  suit: z.enum(["HEARTS", "DIAMONDS", "SPADES", "CLUBS"]),
  value: value
});
export const cardsList = z.array(card);

export type CardType = z.infer<typeof card>;
export type ValueType = z.infer<typeof value>;
export type Player = "Truls" | "Magnus";

const points = (value: ValueType): number => {
  switch (value) {
    case 'A':
      return 11;
      case 'J':
        return 10;
      case 'Q':
        return 10;
      case 'K':
        return 10;
    default:
      return Number(value);
  }
}

const calculatePoints = (cards: CardType[]): number => {
  return cards
        .map((c) => c.value)
        .reduce((acc, c) => acc + points(c), 0);
}

const printCards = (player: Player, cards: CardType[]): void => {
  const cardsString = cards.map((c) => `${c.suit[0]}${c.value}`).join(",");
  const points = calculatePoints(cards);
  console.log(`${player.padEnd(10)} | ${points.toString().padStart(2)} | ${cardsString}`);
}

export const printResult = (winner: Player | undefined, playersData: [Player, CardType[]][]): void => {
  console.log(`Vinner: ${winner ?? 'Ingen'}\r\n`);

  playersData.forEach(([player, cards]) => {
    printCards(player, cards);
  })
}

const drawTwoCardsAndfindWinner = (player1: Player,
                                   player2: Player,
                                   player1Cards: CardType[],
                                   player2Cards: CardType[],
                                   deck: CardType[]): Player | undefined => {
  player1Cards.push(deck.pop()!, deck.pop()!);
  player2Cards.push(deck.pop()!, deck.pop()!);

  if (calculatePoints(player1Cards) === 21) {
    return player1
  } else if (calculatePoints(player2Cards) === 21) {
    return player2
  }  
}

const drawCardsAndFindWinner = (player1: Player,
                                player2: Player,
                                cards: CardType[],
                                deck: CardType[]): Player | undefined => {
  do {
    cards.push(deck.pop()!);
  } while (calculatePoints(cards) < 17)

  const points = calculatePoints(cards)
  if (points === 21) {
    return player1
  } else if (points > 21) {
    return player2
  }
}


export const playGame = (player1: Player,
                         player2: Player,
                         deck: CardType[]): [Player | undefined, CardType[], CardType[]] => {

  const player1Cards: CardType[] = [];
  const player2Cards: CardType[] = [];

  const gamePlay = [
    () => drawTwoCardsAndfindWinner(player1, player2, player1Cards, player2Cards, deck),
    () => drawCardsAndFindWinner(player1, player2, player1Cards, deck),
    () => drawCardsAndFindWinner(player2, player1, player2Cards, deck),
  ];


  const winner = gamePlay.reduce((winner, step) => {
    if (winner !== undefined) {
      return winner;
    }

    return step();
  }, undefined as (Player | undefined));

  return [winner, player1Cards, player2Cards];
}