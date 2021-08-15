import styled from "@emotion/styled"
import { ReactNode } from "react"

const StyledGameWrapper = styled.div({
  flex: 1,
  display: "flex",
  alignItems: "center",
  margin: "56px 0 0 0",
})

export const GameWrapper = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => <StyledGameWrapper>{children}</StyledGameWrapper>
