import styled from '@emotion/styled'
import { useContext } from 'react'
import { GameContext } from '../context/GameContext'
import { isFullCombination } from '../gamelogic/isFullCombination'
import { Button } from './Button'
import { useTranslation } from 'react-i18next'

const Styled = {
  Button: styled(Button)<{ invisible?: boolean }>(
    {
      position: 'absolute',
      margin: '0 auto',
      width: '100%',
      top: '-56px',
    },
    ({ invisible }) =>
      invisible && {
        opacity: 0,
        pointerEvents: 'none',
      }
  ),
}

export const EvaluateButton = (): JSX.Element => {
  const { t } = useTranslation()
  const { evaluateCombination, game } = useContext(GameContext)

  return (
    <Styled.Button
      onClick={evaluateCombination}
      invisible={!isFullCombination(game)}
    >
      {t('try')}
    </Styled.Button>
  )
}
