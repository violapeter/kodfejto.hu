import { Color } from "./constants"

export const compareCombinations = (
  userCombination: FullCombination,
  generatedCombination: FullCombination
): Result => {
  const results: Result = { colorMatch: 0, locationMatch: 0 }

  userCombination.forEach((color: Color, index: number) => {
    if (generatedCombination.includes(color)) {
      results.colorMatch += 1
    }

    if (userCombination[index] === generatedCombination[index]) {
      results.locationMatch += 1
      results.colorMatch -= 1
    }
  })

  return results
}
