import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

type UseDragImage = <T extends HTMLElement>() => {
  ref: MutableRefObject<T | null>
}

export const useDragImage: UseDragImage = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  let clone: T

  const handleDragStart = useCallback((event) => {
    const target = event.target as T
    clone = target.cloneNode() as T
    clone.style.setProperty('cursor', 'grabbing')
    clone.style.setProperty('position', 'absolute')
    clone.style.setProperty('top', '-1000px')
    const offset = target.offsetHeight / 2
    event.dataTransfer?.setDragImage(clone, offset, offset)
    document.body.appendChild(clone)
  }, [])

  const handleDragEnd = useCallback(() => {
    clone.remove()
  }, [])

  useEffect(() => {
    if (ref.current === null || ref.current === undefined) {
      return
    }

    const { current: el } = ref

    el.addEventListener('dragstart', handleDragStart)
    el.addEventListener('dragend', handleDragEnd)

    return () => {
      el.addEventListener('dragstart', handleDragStart)
      el.addEventListener('dragend', handleDragEnd)
    }
  }, [ref, handleDragStart, handleDragEnd])

  return {
    ref,
  }
}
