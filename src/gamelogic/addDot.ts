import { Color } from './constants'

const getFirstEmptySlotIndexOfCombination = (
  combination: Combination
): number => combination.findIndex((slot) => slot === null)

export const addDot = (color: Color, game: Game, slot?: number): Game => {
  const currentCombination = game.board[game.step]
  const slotIndex =
    slot === undefined
      ? getFirstEmptySlotIndexOfCombination(currentCombination)
      : slot

  game.board[game.step][slotIndex] = color

  return { ...game }
}
