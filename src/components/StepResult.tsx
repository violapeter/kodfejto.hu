import styled from '@emotion/styled'

const Styled = {
  Result: styled.div({
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 10px',
    width: 'var(--dot-size)',
  }),
  Match: styled.div<{ isLocationMatch?: boolean; isColorMatch?: boolean }>(
    {
      borderRadius: '100%',
      boxShadow: '0 0 0 1px #ddd',
      flex: '0 0 calc(var(--dot-size) / 4)',
      height: 'calc(var(--dot-size) / 4)',
      margin: 'calc(var(--dot-size) / 8)',
      width: 'calc(var(--dot-size) / 4)',
    },
    ({ isLocationMatch }) => isLocationMatch && { backgroundColor: '#000' },
    ({ isColorMatch }) => isColorMatch && { backgroundColor: '#ddd' }
  ),
}

interface StepProps {
  result: Result
  combinationLength: number
}

export const StepResult = ({
  result: { locationMatch, colorMatch },
  combinationLength,
}: StepProps): JSX.Element => (
  <Styled.Result>
    {[...Array(combinationLength).fill(null)].map((curr, index) => (
      <Styled.Match
        key={`match${index}`}
        isLocationMatch={locationMatch > index}
        isColorMatch={
          colorMatch + locationMatch > index && index >= locationMatch
        }
      />
    ))}
  </Styled.Result>
)
