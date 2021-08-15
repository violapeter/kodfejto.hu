import { MutableRefObject, useEffect, useRef } from 'react'

type UseDragImage = <T extends HTMLElement>() => {
  ref: MutableRefObject<T | null>
}

export const useDragImage: UseDragImage = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)

  useEffect(() => {
    let clone: T
    if (ref.current === null || ref.current === undefined) {
      return
    }

    const { current: el } = ref

    el.addEventListener('dragstart', (event) => {
      const target = event.target as T
      clone = el.cloneNode() as T
      clone.style.setProperty('cursor', 'grabbing')
      const offset = target.offsetHeight / 2
      event.dataTransfer?.setDragImage(clone, offset, offset)
      document.body.appendChild(clone)
    })
    el.addEventListener('dragend', () => clone.remove())
  }, [ref])

  return {
    ref,
  }
}
