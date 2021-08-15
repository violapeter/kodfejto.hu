import { Button } from "./Button"
import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import { useContext, useState } from "react"
import { GameContext } from "../context/GameContext"
import { Overlay } from "./Overlay"

const StyledHeader = styled.header({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  padding: "16px",

  "@media (max-width: 380px)": {
    padding: "4px 8px",
  },
})

export const Header = (): JSX.Element => {
  const { t } = useTranslation()
  const {
    replay,
    game: { slotsCount, stepsCount, board },
  } = useContext(GameContext)
  const [opened, setOpened] = useState(false)
  const shouldHideRestart = board.every((step) =>
    step.every((slot) => slot === null)
  )

  return (
    <StyledHeader>
      {shouldHideRestart ? null : (
        <Button theme={"ternary"} onClick={replay}>
          {t("restart")}
        </Button>
      )}
      <Button theme={"ternary"} onClick={() => setOpened(true)}>
        ?
      </Button>
      <Overlay
        buttonLabel={t("understand")}
        action={() => setOpened(false)}
        opened={opened}
      >
        {t("help", { slotsCount, stepsCount })}
      </Overlay>
    </StyledHeader>
  )
}
