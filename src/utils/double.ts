import { memoize, range } from "lodash"
import { Cards, totalCards } from "./cards"
import stand from "./stand"

const double = memoize(
  (
    cards: Cards,
    player: number,
    card: number,
    isSoft = false,
    POA = false,
    POT = false
  ): number => {
    if (isSoft) {
      if (player <= 21)
        return (
          (2 *
            range(1, 11).reduce(
              (p, c) =>
                p + cards[c] * stand(cards, player + c, card, true, POA, POT),
              0
            )) /
          totalCards(cards, [1, 11])
        )
      return double(cards, player - 10, card, false, POA, POT)
    } else {
      if (player <= 20)
        return (
          (2 *
            range(2, 12).reduce(
              (p, c) =>
                p +
                cards[c] * stand(cards, player + c, card, c === 11, POA, POT),
              0
            )) /
          totalCards(cards, [2, 12])
        )
      return -2
    }
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

export default double
