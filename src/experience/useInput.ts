import { useEffect } from 'react'
import { inputState } from './inputState'

// Wires keyboard movement into the shared input store. Cleared on unmount and
// when the window loses focus so keys don't "stick".
export function useInput() {
  useEffect(() => {
    const keys = new Set<string>()

    const sync = () => {
      inputState.forward =
        (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0)
      inputState.right =
        (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0)
      inputState.interact = keys.has('e')
    }

    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (['w', 'a', 's', 'd', 'e', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        keys.add(k)
        sync()
      }
    }
    const up = (e: KeyboardEvent) => {
      keys.delete(e.key.toLowerCase())
      sync()
    }
    const reset = () => {
      keys.clear()
      sync()
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', reset)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', reset)
      reset()
    }
  }, [])
}
