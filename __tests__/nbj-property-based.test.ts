import { number } from 'zod';
import { playGame } from '../src/nbj';
import type { CardType } from '../src/nbj';
import fc, { string, VerbosityLevel } from 'fast-check';

const suitArbitrary = fc.constantFrom("SPADES", "CLUBS", "HEARTS", "DIAMONDS");
const valueArbitrary = fc.constantFrom("2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A");

describe('Blackjack property based tests', () => {
  it('Check if the rules are followed', () => {
    fc.assert(
      fc.property(fc.array(fc.record({ suit: suitArbitrary, value: valueArbitrary }), {minLength: 52, maxLength: 52}), data => {
          const [winner, _player1Cards, _player2Cards] = playGame("Truls", "Magnus", data as CardType[]);
          // TODO: assert that the rules are followed
        }
      )
    ), {VerbosityLevel: VerbosityLevel.VeryVerbose};
  });

});
