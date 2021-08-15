export const useStorage = <T>(
  storage: Storage
): {
  save: (item: T) => void
  open: () => T | null
} => {
  const key = 'hu.kodfejto.game'

  const save = (item: T) => {
    storage.setItem(key, JSON.stringify(item))
  }

  const open = () => {
    const item = storage.getItem(key)

    return item === null ? null : (JSON.parse(item) as T)
  }

  return {
    save,
    open,
  }
}
