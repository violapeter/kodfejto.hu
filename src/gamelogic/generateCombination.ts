import { Color } from './constants'

const getRandomInt = (min: number, max: number): number => {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt
}

const getRandomColor = (): Color => {
  const values = Object.values(Color)
  const randomIndex = getRandomInt(0, values.length - 1)
  return values[randomIndex] as Color
}

export const generateCombination = (
  combinationLength: number
): FullCombination => {
  const colors: Color[] = []

  while (colors.length < combinationLength) {
    const currentColor = getRandomColor()
    if (!colors.includes(currentColor)) {
      colors.push(currentColor)
    }
  }

  return colors
}
