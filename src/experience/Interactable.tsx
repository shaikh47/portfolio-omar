import { useState, type ReactNode } from 'react'
import { useCursor } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'

type Props = {
  onClick?: () => void
  children: (hovered: boolean) => ReactNode
} & Omit<ThreeElements['group'], 'children'>

// Generic hover/click wrapper for room props: changes the cursor on hover and
// exposes the hovered state to children so they can highlight themselves.
export function Interactable({ onClick, children, ...rest }: Props) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  return (
    <group
      {...rest}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {children(hovered)}
    </group>
  )
}
