import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Button } from './Button'

interface OverlayProps {
  children: ReactNode
  buttonLabel: string
  action: () => unknown
  opened: boolean
}

const Styled = {
  Wrapper: styled.div<{ opened: boolean }>(
    {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 214, 182, 0.7)',
      top: '0',
      left: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      opacity: 0,
      transition: 'opacity 0.1s ease,\n    visibility 0.1s ease',
      visibility: 'hidden',
    },
    ({ opened }) =>
      opened && {
        opacity: 1,
        visibility: 'visible',
      }
  ),
  Box: styled.div<{ opened: boolean }>(
    {
      borderRadius: '32px',
      background: 'white',
      maxWidth: '960px',
      transition: 'transform 0.1s ease',
      transform: 'scale(0.9)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 20px',
      alignItems: 'center',
    },
    ({ opened }) =>
      opened && {
        transform: 'scale(1)',
      }
  ),
  Content: styled.div({
    padding: '32px',
    color: '#757575',
    lineHeight: '1.5em',
  }),
  ActionWrapper: styled.div({
    padding: 16,
  }),
}

export const Overlay = ({
  children,
  buttonLabel,
  action,
  opened,
}: OverlayProps): JSX.Element => (
  <Styled.Wrapper role="dialog" opened={opened}>
    <Styled.Box opened={opened}>
      <Styled.Content>{children}</Styled.Content>
      <Styled.ActionWrapper>
        <Button theme={'primary'} onClick={action}>
          {buttonLabel}
        </Button>
      </Styled.ActionWrapper>
    </Styled.Box>
  </Styled.Wrapper>
)
