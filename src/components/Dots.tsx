import styled from "@emotion/styled"
import { DragEventHandler, useContext } from "react"
import { GameContext } from "../context/GameContext"
import { Dot } from "./Dot"
import { Color } from "../gamelogic/constants"

const Styled = {
  Wrapper: styled.div({
    background: "#f1f1f1",
    borderRadius: "0 5px 5px 0",
    boxShadow:
      "inset 3px 0 0 0 rgba(0, 0, 0, 0.1),\n    0 4px 0 0 rgba(0, 0, 0, 0.2)",
    position: "absolute",
    padding: "10px",
    right: "calc(-1 * (var(--dot-size) + 20px))",
    top: "var(--dot-size)",
  }),
  Dot: styled(Dot)({
    margin: "10px 0 0 0",
  }),
}

export const Dots = (): JSX.Element => {
  const {
    game: { step, board },
    addDot,
  } = useContext(GameContext)

  const getDragStartHandler =
    (color: Color): DragEventHandler<HTMLDivElement> =>
    (event) => {
      event.dataTransfer?.setData("text/plain", color)
    }

  const handleDragEnd: DragEventHandler = () => {
    console.log("implementation")
  }

  const handleClick = (color: Color) => {
    if (board[step].includes(color)) {
      return
    }

    addDot(color)
  }

  return (
    <Styled.Wrapper>
      {Object.values(Color).map((color, index) => (
        <Styled.Dot
          key={color}
          used={board[step].includes(color)}
          color={color}
          onDragStart={getDragStartHandler(color)}
          onDragEnd={handleDragEnd}
          onClick={() => handleClick(color)}
          draggable
        />
      ))}
    </Styled.Wrapper>
  )
}
