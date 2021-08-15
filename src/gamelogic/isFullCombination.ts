import { Color } from "./constants"

const isColor = (value: string | null): boolean => {
  return Object.values(Color).includes(value as Color)
}

export const isFullCombination = (game: Game): boolean => {
  const currentCombination = game.board[game.step]
  return (
    currentCombination.length === game.slotsCount &&
    currentCombination.every(isColor)
  )
}
