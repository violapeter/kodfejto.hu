import { useContext } from "react"
import { GameContext } from "../context/GameContext"
import { Overlay } from "./Overlay"
import { GameState } from "../gamelogic/constants"
import { useTranslation } from "react-i18next"

export const Overlays = (): JSX.Element => {
  const {
    replay,
    game: { state },
  } = useContext(GameContext)
  const { t } = useTranslation()

  return (
    <>
      <Overlay
        buttonLabel={t("playAgain")}
        action={replay}
        opened={state === GameState.Won}
      >
        {t("won")}
      </Overlay>
      <Overlay
        buttonLabel={t("retry")}
        action={replay}
        opened={state === GameState.Lost}
      >
        {t("lost")}
      </Overlay>
    </>
  )
}
