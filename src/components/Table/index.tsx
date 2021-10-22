import { range } from "lodash"
import { useEffect, useReducer, useState } from "react"
import { Cards } from "../../utils/cards"
import split from "../../utils/split"
import styles from "./Table.module.scss"

type cardAction = {
  type: "discard" | "reset"
  card?: number
  decks?: number
}

const cardsReducer = (
  cards: Cards,
  { type, card = 10, decks = 8 }: cardAction
): Cards => {
  switch (type) {
    case "discard":
      return card === 1 || card === 11
        ? {
            ...cards,
            1: Math.max(cards[1] - 1, 0),
            11: Math.max(cards[11] - 1, 0),
          }
        : { ...cards, [card]: Math.max(cards[card] - 1, 0) }
    case "reset":
      return {
        1: 4 * decks,
        2: 4 * decks,
        3: 4 * decks,
        4: 4 * decks,
        5: 4 * decks,
        6: 4 * decks,
        7: 4 * decks,
        8: 4 * decks,
        9: 4 * decks,
        10: 16 * decks,
        11: 4 * decks,
      }
  }
}

const player = range(2, 12)
const dealer = range(2, 12)

const Table = () => {
  const [decks, setDecks] = useState(8)
  const [peekOnAce, setPeekOnAce] = useState(true)
  const [peekOnTen, setPeekOnTen] = useState(true)
  const [cards, dispatchCards] = useReducer(cardsReducer, {
    1: 4 * decks,
    2: 4 * decks,
    3: 4 * decks,
    4: 4 * decks,
    5: 4 * decks,
    6: 4 * decks,
    7: 4 * decks,
    8: 4 * decks,
    9: 4 * decks,
    10: 16 * decks,
    11: 4 * decks,
  })
  useEffect(() => {
    dispatchCards({ type: "reset", decks })
  }, [decks])

  return (
    <>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td></td>
            {dealer.map((j) => (
              <td key={j}>{j}</td>
            ))}
          </tr>

          {player.map((i) => (
            <tr key={i}>
              <td>{i}</td>
              {dealer.map((j) => (
                <td
                  key={j}
                  className={
                    styles[split(cards, i, j, peekOnAce, peekOnTen).action]
                  }
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table
