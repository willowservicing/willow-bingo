// There is also `bingo-simple-data.ts` file available for simplified debugging or testing. Feel free to use or not use this file.
// import { numbers, cards } from './bingo-data-simple';
import { numbers, cards } from './bingo-data';

export const unroll_card = (card: number[][]): number[] => {
  const unroll = [].concat.apply([], card);
  console.log(card);
  console.log(unroll);
  return unroll;
};
/* Unroll matrix into a list so we can index over it and mark called numbers with -1?
  Winning row or col: Every element that is 5 elements away from another is -1 
*/
export const unroll_cards = (cards: number[][][]): number[][] => {
  // Unroll into single array so we can index over it
  let unrolled_cards = [];
  for (const card of cards) {
    unrolled_cards.push(unroll_card(card));
  }

  return unrolled_cards;
};

export const check_winner = (card: number[]): boolean => {
  const positions = [0, 5, 10, 15, 20];
  for (let i = 1; i <= 5; i++) {
    if (
      card[i * positions[0]] === -1 &&
      card[i * positions[1]] === -1 &&
      card[i * positions[2]] === -1 &&
      card[i * positions[3]] === -1 &&
      card[i * positions[4]] === -1
    ) {
      return true;
    }
  }
  return false;
};

export const calculate_score = (
  winning_card: number[],
  winning_number: number
): number => {
  let score = 0;
  for (const element of winning_card) {
    if (element !== -1) {
      score += element;
    }
  }
  return score * winning_number;
};

export const call_numbers = (
  numbers: number[],
  cards: number[][][]
): [number[], number] | void => {
  let winner = false;
  let unrolled_cards = unroll_cards(cards);
  while (numbers && winner === false) {
    const num = numbers.shift();
    console.log(`Calling number: ${num}`);
    for (let card = 0; card < unrolled_cards.length; card++) {
      for (let element = 0; element < unrolled_cards[card].length; element++) {
        if (unrolled_cards[card][element] === num) {
          unrolled_cards[card][element] = -1;
        }
      }
    }

    for (const card of unrolled_cards) {
      console.log(`Checking card: ${card}`);
      if (check_winner(card)) {
        console.log(`Winning card! ${card}`);
        return [card, num];
      }
    }
  }
};

export const bingo = (): number | void => {
  console.log("Let's play bingo!");
  //unroll_cards(cards);
  const winner = call_numbers(numbers, cards);
  if (winner) {
    let score = calculate_score(winner[0], winner[1]);
    console.log(`Winning number: ${score}`);
    console.log(typeof score);
    return score;
  }
};

bingo();
