import { GameContextProvider } from '../context/GameContext'
import { GameBoard } from './GameBoard'
import { Header } from './Header'
import { Footer } from './Footer'
import { GameWrapper } from './GameWrapper'
import { Overlays } from './Overlays'

export const App = (): JSX.Element => (
  <GameContextProvider>
    <Header />
    <GameWrapper>
      <GameBoard />
    </GameWrapper>
    <Footer />
    <Overlays />
  </GameContextProvider>
)
