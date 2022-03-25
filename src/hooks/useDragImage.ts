import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

type UseDragImage = <T extends HTMLElement>() => {
  ref: MutableRefObject<T | null>
}

export const useDragImage: UseDragImage = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [clone, setClone] = useState<T>()

  const handleDragStart = useCallback((event) => {
    const target = event.target as T
    const cloneEl = target.cloneNode() as T
    setClone(cloneEl)
    cloneEl.style.setProperty('cursor', 'grabbing')
    cloneEl.style.setProperty('position', 'absolute')
    cloneEl.style.setProperty('top', '-1000px')
    const offset = target.offsetHeight / 2
    event.dataTransfer?.setDragImage(cloneEl, offset, offset)
    document.body.appendChild(cloneEl)
  }, [])

  const handleDragEnd = useCallback(() => {
    clone?.remove()
  }, [clone])

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
