export const removeDot = (index: number, game: Game): Game => {
  game.board[game.step][index] = null

  return { ...game }
}
