import styled from '@emotion/styled'
import { Step } from './Step'
import { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { EvaluateButton } from './EvaluateButton'
import { Dots } from './Dots'

const Styled = {
  GameBoard: styled.div({
    background: '#fff',
    borderRadius: '5px',
    boxShadow: '0 4px 0 0 rgba(0, 0, 0, 0.2)',
    position: 'relative',
  }),
  Steps: styled.div({
    padding: '20px 0',
    counterReset: 'step',

    '@media (max-device-height: 732px)': {
      padding: '10px 0',
    },
  }),
}

export const GameBoard = (): JSX.Element => {
  const {
    game: { board, step, results },
  } = useContext(GameContext)

  return (
    <Styled.GameBoard>
      <EvaluateButton />
      <Dots />
      <Styled.Steps>
        {board.map((combination: Combination, index: number) => (
          <Step
            active={step === index}
            combination={combination}
            result={results[index]}
            key={`step${index}`}
          />
        ))}
      </Styled.Steps>
    </Styled.GameBoard>
  )
}
