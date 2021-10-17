import { memoize, range } from "lodash"
import { Cards, totalCards } from "./cards"
import hitStandDouble from "./hitStandDouble"

const split = memoize(
  (cards: Cards, pairOf: number, card: number, POA = false, POT = false) => {
    if (pairOf === 11 || pairOf === 1)
      return (
        (2 *
          range(1, 11).reduce(
            (p, c) =>
              p +
              cards[c] * hitStandDouble(cards, pairOf, card, true, POA, POT),
            0
          )) /
        totalCards(cards, [1, 11])
      )
    else
      return (
        (2 *
          range(2, 12).reduce(
            (p, c) =>
              p +
              cards[c] *
                hitStandDouble(cards, pairOf, card, c === 11, POA, POT),
            0
          )) /
        totalCards(cards, [2, 12])
      )
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

export default split
