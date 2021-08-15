type Result = {
  locationMatch: number
  colorMatch: number
}
type Results = Result[]
type Combination = Array<Color | null>
type FullCombination = Color[]
type Board = Combination[]

interface Game {
  readonly combination: FullCombination
  readonly stepsCount: number
  readonly slotsCount: number
  state: GameState
  results: Results
  board: Board
  step: number
}
