import styled from '@emotion/styled'
import { DragEventHandler, useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { Dot } from './Dot'
import { Color } from '../gamelogic/constants'
import { useDragImage } from '../hooks/useDragImage'

const Styled = {
  Wrapper: styled.div({
    background: '#f1f1f1',
    borderRadius: '0 5px 5px 0',
    boxShadow:
      'inset 3px 0 0 0 rgba(0, 0, 0, 0.1),\n    0 4px 0 0 rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    padding: '10px',
    right: 'calc(-1 * (var(--dot-size) + 20px))',
    top: 'var(--dot-size)',
  }),
  Dot: styled(Dot)({
    margin: '10px 0 0 0',
  }),
}

const DraggableDot = ({ color }: { color: Color }): JSX.Element => {
  const { ref } = useDragImage<HTMLDivElement>()
  const {
    game: { step, board },
    addDot,
  } = useContext(GameContext)

  const getDragStartHandler =
    (color: Color): DragEventHandler<HTMLDivElement> =>
    (event) => {
      event.dataTransfer?.setData('text/plain', color)
    }

  const handleClick = (color: Color) => {
    if (board[step].includes(color)) {
      return
    }

    addDot(color)
  }

  return (
    <Styled.Dot
      ref={ref}
      used={board[step].includes(color)}
      color={color}
      onDragStart={getDragStartHandler(color)}
      onClick={() => handleClick(color)}
      draggable
    />
  )
}

export const Dots = (): JSX.Element => {
  return (
    <Styled.Wrapper>
      {Object.values(Color).map((color) => (
        <DraggableDot color={color} key={color} />
      ))}
    </Styled.Wrapper>
  )
}
