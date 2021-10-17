import { memoize } from "lodash"
import { Cards } from "./cards"
import double from "./double"
import hit from "./hit"
import stand from "./stand"

const hitStandDouble = memoize(
  (
    cards: Cards,
    player: number,
    card: number,
    isSoft = false,
    POA = false,
    POT = false
  ) => {
    return Math.max(
      hit(cards, player, card, isSoft, POA, POT),
      stand(cards, player, card, isSoft, POA, POT),
      double(cards, player, card, isSoft, POA, POT)
    )
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

export default hitStandDouble
