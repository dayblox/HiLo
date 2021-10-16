import { memoize } from "lodash"
import { Cards } from "./cards"
import dealer, { Out } from "./dealer"

const outs = [17, 18, 19, 20, 21]

const stand = memoize(
  (
    cards: Cards,
    player: number,
    card: number,
    isSoft = false,
    POA = false,
    POT = false
  ): number => {
    if (isSoft) {
      if (player <= 21) {
        return stand(cards, player, card, false, POA, POT)
      }
      return stand(cards, player - 10, card, false, POA, POT)
    } else {
      if (player <= 16)
        return (
          dealer(cards, "bust", card, POA, POT) -
          outs.reduce((p, c) => p + dealer(cards, c as Out, card, POA, POT), 0)
        )
      if (player <= 21)
        return (
          dealer(cards, "bust", card, POA, POT) +
          outs
            .filter((i) => i < player)
            .reduce((p, c) => p + dealer(cards, c as Out, card, POA, POT), 0) -
          outs
            .filter((i) => i > player)
            .reduce((p, c) => p + dealer(cards, c as Out, card, POA, POT), 0)
        )
      return -1
    }
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

export default stand
