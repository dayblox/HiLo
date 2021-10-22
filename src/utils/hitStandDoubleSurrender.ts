import { memoize } from "lodash"
import { Cards } from "./cards"
import double from "./double"
import hit from "./hit"
import stand from "./stand"
import surrender from "./surrender"

export enum Action {
  Stand = "S",
  Hit = "H",
  Double = "D",
  Surrender = "R",
  Split = "P",
}

const hitStandDoubleSurrender = memoize(
  (
    cards: Cards,
    player: number,
    card: number,
    isSoft = false,
    POA = false,
    POT = false
  ) => {
    return [
      {
        value: stand(cards, player, card, isSoft, POA, POT),
        action: Action.Stand,
      },
      { value: hit(cards, player, card, isSoft, POA, POT), action: Action.Hit },
      {
        value: double(cards, player, card, isSoft, POA, POT),
        action: Action.Double,
      },
      { value: surrender(player, isSoft), action: Action.Surrender },
    ].reduce((p, c) => (c.value > p.value ? c : p))
  },
  (cards, ...args) => [Object.values(cards), ...args].join("_")
)

export default hitStandDoubleSurrender
