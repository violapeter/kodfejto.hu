import { compareCombinations } from './compareCombinations'
import { GameState } from './constants'

export const evaluateCombination = (
  combination: FullCombination,
  game: Game
): Game => {
  game.results[game.step] = compareCombinations(combination, game.combination)

  const isCurrentCombinationCorrect =
    game.results[game.step].locationMatch === game.slotsCount
  const isLastStep = game.step + 1 === game.stepsCount

  if (isCurrentCombinationCorrect) {
    game.state = GameState.Won
  }

  if (!isCurrentCombinationCorrect && isLastStep) {
    game.state = GameState.Lost
  }

  if (game.state === GameState.InProgress) {
    game.step += 1
  }

  return { ...game }
}
