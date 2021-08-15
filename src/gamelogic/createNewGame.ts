import { generateCombination } from './generateCombination'
import { GameState } from './constants'

export const createNewGame = (
  stepsCount: number,
  combinationLength: number
): Game => ({
  stepsCount,
  slotsCount: combinationLength,
  state: GameState.InProgress,
  step: 0,
  combination: generateCombination(combinationLength),
  results: Array(stepsCount)
    .fill(null)
    .map(() => ({
      locationMatch: 0,
      colorMatch: 0,
    })),
  board: Array(stepsCount)
    .fill(null)
    .map(() => Array(combinationLength).fill(null)),
})
