import styled from '@emotion/styled'
import { Dot } from './Dot'
import { StepResult } from './StepResult'
import { DragEventHandler, useContext, useState } from 'react'
import { GameContext } from '../context/GameContext'
import { Color } from '../gamelogic/constants'

const Styled = {
  Step: styled.div<{ active: boolean }>(
    {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px 0',
      position: 'relative',

      ':first-of-type::before': {
        borderRadius: '5px 0 0 0',
      },
      ':last-of-type::before': {
        borderRadius: '0 0 0 5px',
        boxShadow: '0 4px 0 0 rgba(0, 0, 0, 0.2)',
      },

      '::before': {
        background: '#f9f9f9',
        color: '#ddd',
        content: 'counter(step)',
        counterIncrement: 'step',
        fontSize: '18px',
        justifyContent: 'center',
        height: '100%',
        left: '-40px',
        lineHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        textAlign: 'center',
        top: '0',
        transition: 'font-size 0.3s ease',
        userSelect: 'none',
        width: '40px',

        '@media (max-device-height: 600px)': {
          padding: '8px 0',
        },
      },
    },
    ({ active }) =>
      active && {
        backgroundColor: '#f3f3f3',

        '::before': {
          color: '#606062',
          fontSize: '24px',
        },
      }
  ),
  Dot: styled(Dot)<{ active: boolean }>(
    {
      margin: '0 0 0 10px',
      boxShadow: '0 0 0 1px #ddd',
    },
    ({ active }) =>
      !active && {
        pointerEvents: 'none',
      }
  ),
}

interface StepProps {
  active: boolean
  combination: Combination | FullCombination
  result: Result
}

export const Step = ({
  active,
  combination,
  result,
}: StepProps): JSX.Element => {
  const { removeDot, addDot } = useContext(GameContext)
  const [dragOver, setDragover] = useState<number>()

  const getDragOverHandler =
    (index: number): DragEventHandler<HTMLDivElement> =>
    (event) => {
      event.preventDefault()
      setDragover(index)
    }

  const getDropHandler =
    (index: number): DragEventHandler<HTMLDivElement> =>
    (event) => {
      if (!active) return

      const color = event.dataTransfer?.getData('text/plain') as Color
      addDot(color, index)
      setDragover(undefined)
    }

  const handleDragEnter: DragEventHandler<HTMLDivElement> = ({
    nativeEvent,
  }) => {
    nativeEvent.preventDefault()
  }

  return (
    <Styled.Step active={active}>
      {combination.map((color, index) => (
        <Styled.Dot
          key={`dot${index}`}
          color={color}
          onDragOver={getDragOverHandler(index)}
          onDragEnter={handleDragEnter}
          onDragLeave={() => setDragover(undefined)}
          onDrop={getDropHandler(index)}
          onRemove={() => removeDot(index)}
          removable={active && color !== null}
          dragover={active && dragOver === index}
          active={active}
        />
      ))}
      <StepResult result={result} combinationLength={combination.length} />
    </Styled.Step>
  )
}
