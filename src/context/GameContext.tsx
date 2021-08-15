import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { createNewGame } from "../gamelogic/createNewGame"
import { useStorage } from "../hooks/useStorage"
import { evaluateCombination as evaluate } from "../gamelogic/evaluateCombination"
import { addDot as add } from "../gamelogic/addDot"
import { removeDot as remove } from "../gamelogic/removeDot"
import { Color, SLOTS_COUNT, STEPS_COUNT } from "../gamelogic/constants"

interface GameContextInterface {
  game: Game
  evaluateCombination: () => void
  addDot: (color: Color, slot?: number) => void
  removeDot: (index: number) => void
  replay: () => void
}

const defaultError = () => {
  throw new Error('No "GameContext" provided')
}

export const GameContext = createContext<GameContextInterface>({
  game: createNewGame(STEPS_COUNT, SLOTS_COUNT),
  evaluateCombination: defaultError,
  addDot: defaultError,
  removeDot: defaultError,
  replay: defaultError,
})

export const GameContextProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const { game: defaultGame } = useContext<GameContextInterface>(GameContext)
  const { save, open } = useStorage<Game>(localStorage)
  const savedGame = open()
  const [game, setGame] = useState<Game>(
    savedGame === null ? defaultGame : savedGame
  )

  const evaluateCombination = () => {
    setGame(evaluate(game.board[game.step] as FullCombination, game))
  }

  const addDot = (color: Color, slot?: number) => {
    setGame(add(color, game, slot))
  }

  const removeDot = (slot: number) => {
    setGame(remove(slot, game))
  }

  const replay = () => {
    setGame(createNewGame(STEPS_COUNT, SLOTS_COUNT))
  }

  useEffect(() => {
    save(game)
  }, [game, save])

  const contextValue = {
    game,
    evaluateCombination,
    addDot,
    removeDot,
    replay,
  }

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
