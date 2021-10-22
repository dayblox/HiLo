import { memoize, range } from "lodash"
import { Cards, totalCards } from "./cards"
import hitStandDoubleSurrender, { Action } from "./hitStandDoubleSurrender"
import stand from "./stand"

const split = memoize(
  (cards: Cards, pairOf: number, card: number, POA = false, POT = false) => {
    const split = _split(cards, pairOf, card, POA, POT)
    const other = hitStandDoubleSurrender(
      cards,
      pairOf * 2,
      card,
      pairOf === 1 || pairOf === 11,
      POA,
      POT
    )
    return split > other.value
      ? {
          value: split,
          action: Action.Split,
        }
      : other
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

const _split = memoize(
  (cards: Cards, pairOf: number, card: number, POA = false, POT = false) => {
    if (pairOf === 11 || pairOf === 1)
      return (
        (2 *
          range(1, 11).reduce(
            (p, c) =>
              p + cards[c] * stand(cards, pairOf + c, card, true, POA, POT),
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
                hitStandDoubleSurrender(
                  cards,
                  pairOf + c,
                  card,
                  c === 11,
                  POA,
                  POT
                ).value,
            0
          )) /
        totalCards(cards, [2, 12])
      )
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

export default split
