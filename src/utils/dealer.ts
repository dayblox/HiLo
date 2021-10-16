import { Cards, totalCards } from "./cards"
import { memoize, range } from "lodash"

export type Out = 17 | 18 | 19 | 20 | 21 | "bust"

const dealer = memoize(
  (cards: Cards, out: Out, card: number, POA = false, POT = false) => {
    if (card === 11) {
      return (
        range(1, POA ? 10 : 11).reduce(
          (p, c) =>
            p + cards[c] * _dealer(cards, out, c + card, true, POA, POT),
          0
        ) / totalCards(cards, [1, POA ? 10 : 11])
      )
    }
    if (card === 10 && POT)
      return (
        range(2, 11).reduce(
          (p, c) =>
            p + cards[c] * _dealer(cards, out, c + card, false, POA, POT),
          0
        ) / totalCards(cards, [2, 11])
      )
    return _dealer(cards, out, card, false, POA, POT)
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

const _dealer = memoize(
  (
    cards: Cards,
    out: Out,
    dealer: number,
    isSoft = false,
    POA = false,
    POT = false
  ): number => {
    if (isSoft) {
      if (dealer <= 16)
        return (
          range(1, 11).reduce(
            (p, c) =>
              p + cards[c] * _dealer(cards, out, c + dealer, true, POA, POT),
            0
          ) / totalCards(cards, [1, 11])
        )
      if (dealer >= 22) return _dealer(cards, out, dealer - 10, false, POA, POT)
      return dealer === out ? 1 : 0
    } else {
      if (dealer <= 16)
        return (
          range(2, 12).reduce(
            (p, c) =>
              p +
              cards[c] * _dealer(cards, out, c + dealer, c === 11, POA, POT),
            0
          ) / totalCards(cards, [2, 12])
        )
      if (dealer >= 22) return out === "bust" ? 1 : 0
      return dealer === out ? 1 : 0
    }
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

export default dealer
