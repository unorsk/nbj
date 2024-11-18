import { cardsList, playGame, printResult, type CardType, type Player } from "./src/nbj";


(async () => {
  const url = process.argv[2]
  if (!url) {
    console.error("Usage: bun index.ts -- <url>")
    return;
  }
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Error fetching: ${url}`)
    console.error(response.statusText);
    return;
  }

  const { success, error, data: deck }  = cardsList.safeParse(await response.json());
  if (!success) {
    console.error(error);
    return;
  }

  const player1 = "Truls";
  const player2 = "Magnus";

  const [winner, player1Cards, player2Cards] = playGame(player1, player2, deck);

  printResult(winner, [[player1, player1Cards], [player2, player2Cards]]);

})();

