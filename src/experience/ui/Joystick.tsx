import { useRef, useState } from 'react'
import { inputState } from '../inputState'

const RADIUS = 56

// On-screen joystick for touch devices. Writes normalized movement straight
// into the shared input store (same one the keyboard hook feeds).
export function Joystick() {
  const baseRef = useRef<HTMLDivElement>(null)
  const [knob, setKnob] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const update = (clientX: number, clientY: number) => {
    const base = baseRef.current
    if (!base) return
    const rect = base.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > RADIUS) {
      dx = (dx / dist) * RADIUS
      dy = (dy / dist) * RADIUS
    }
    setKnob({ x: dx, y: dy })
    inputState.right = dx / RADIUS
    inputState.forward = -dy / RADIUS // up = forward
  }

  const end = () => {
    setActive(false)
    setKnob({ x: 0, y: 0 })
    inputState.right = 0
    inputState.forward = 0
  }

  return (
    <div
      ref={baseRef}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        setActive(true)
        update(e.clientX, e.clientY)
      }}
      onPointerMove={(e) => active && update(e.clientX, e.clientY)}
      onPointerUp={end}
      onPointerCancel={end}
      className="md:hidden absolute bottom-8 left-8 z-[110] touch-none select-none rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
      style={{ width: RADIUS * 2, height: RADIUS * 2 }}
    >
      <div
        className="absolute rounded-full bg-white/70 shadow-lg"
        style={{
          width: 48,
          height: 48,
          left: RADIUS - 24,
          top: RADIUS - 24,
          transform: `translate(${knob.x}px, ${knob.y}px)`,
          transition: active ? 'none' : 'transform 0.15s ease-out',
        }}
      />
    </div>
  )
}
