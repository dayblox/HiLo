import { memoize } from "lodash"
import { Cards } from "./cards"
import hit from "./hit"
import stand from "./stand"

const hitStand = memoize(
  (
    cards: Cards,
    player: number,
    card: number,
    isSoft = false,
    POA = false,
    POT = false
  ): number => {
    if (!isSoft && player >= 22) return -1
    return Math.max(
      stand(cards, player, card, isSoft, POA, POT),
      hit(cards, player, card, isSoft, POA, POT)
    )
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

export default hitStand
