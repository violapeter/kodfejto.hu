import styled from '@emotion/styled'
import {
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  HTMLAttributes,
  RefAttributes,
} from 'react'
import { Color } from '../gamelogic/constants'

const colorMap: { [value in Color]: string } = {
  [Color.Grey]: '#34495e',
  [Color.Green]: '#2ecc71',
  [Color.Blue]: '#3498db',
  [Color.Purple]: '#9b59b6',
  [Color.Pink]: '#ea67c7',
  [Color.Yellow]: '#f1c40f',
  [Color.Orange]: '#e67e22',
  [Color.Red]: '#e74c3c',
}

interface DotProps extends HTMLAttributes<HTMLDivElement> {
  color?: Color
  active?: boolean
  used?: boolean
  dragover?: boolean
  removable?: boolean
  onRemove?: () => unknown
}

const Styled = {
  Dot: styled.div<DotProps>(
    {
      cursor: 'grab',
      borderRadius: '100%',
      height: 'var(--dot-size)',
      width: 'var(--dot-size)',

      ':active': {
        cursor: 'grabbing',
      },
    },
    ({ color }) =>
      color === undefined || color === null
        ? {
            borderRadius: '100%',
            height: 'var(--dot-size)',
            width: 'var(--dot-size)',
            transition: 'box-shadow 0.2s ease',
          }
        : {
            backgroundColor: colorMap[color],
          },
    ({ used }) =>
      used && {
        cursor: 'default',
        boxShadow: `
            inset 0 0 0 2px white,
            0 0 0 2px #ddd`,
        ':active': {
          cursor: 'default',
        },
      },
    ({ dragover }) =>
      dragover && {
        boxShadow: `
            0 0 0 2px #ddd,
            inset 0 0 0 4px rgba(0, 0, 0, 0.3) !important`,
      }
  ),
  RemoveButton: styled.button({
    background: 'none',
    border: 0,
    display: 'block',
    width: 'var(--dot-size)',
    height: 'var(--dot-size)',
    lineHeight: 'var(--dot-size)',
    textAlign: 'center',

    '::before': {
      display: 'block',
      content: "'×'",
      color: 'white',
      fontSize: '32px',
      opacity: 0,
      transition: 'all 0.3s cubic-bezier(0.25, 0, 0, 1.5)',
      transform: 'scale(0.5) rotate(-45deg)',
    },

    '&:hover::before': {
      opacity: 1,
      transform: 'scale(1)',
      visibility: 'visible',
    },
  }),
}

const DotRenderFn: ForwardRefRenderFunction<HTMLDivElement, DotProps> = (
  { color, used, dragover, removable, onRemove, ...props },
  forwardedRef
) => (
  <Styled.Dot
    ref={forwardedRef}
    color={color}
    used={used}
    dragover={dragover}
    {...props}
  >
    {removable && <Styled.RemoveButton onClick={() => onRemove?.()} />}
  </Styled.Dot>
)

export const Dot: ForwardRefExoticComponent<
  DotProps & RefAttributes<HTMLDivElement>
> = forwardRef(DotRenderFn)
