import { memoize } from "lodash"

const surrender = memoize(
  (player: number, isSoft = false): number => {
    return !isSoft && player >= 22 ? -1 : -0.5
  },
  (...args) => args.join("_")
)

export default surrender
