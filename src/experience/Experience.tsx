import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { Room } from './Room'
import { Player } from './Player'
import { Hotspots } from './Hotspots'
import { useInput } from './useInput'
import { SPAWN } from './layout'
import { Hud } from './ui/Hud'
import { Joystick } from './ui/Joystick'
import { InfoModal } from './ui/InfoModal'
import type { ActivePanel } from './types'

export function Experience({ onExit }: { onExit: () => void }) {
  useInput()
  const playerPos = useRef(new THREE.Vector3(SPAWN.x, 0, SPAWN.z))
  const [active, setActive] = useState<ActivePanel | null>(null)
  const [leaving, setLeaving] = useState(false)

  const beginExit = () => setLeaving(true)

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-neutral-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [SPAWN.x, 6.5, SPAWN.z + 9], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#dfe2ea']} />
        <fog attach="fog" args={['#dfe2ea', 45, 90]} />
        <Room />
        <Suspense fallback={null}>
          <Player playerPos={playerPos} locked={active !== null || leaving} />
        </Suspense>
        <Hotspots onSelect={setActive} onExit={beginExit} playerPos={playerPos} />
        <ContactShadows position={[0, 0.02, 0]} scale={28} resolution={1024} blur={2.4} opacity={0.45} far={6} />
      </Canvas>

      <Hud onExit={beginExit} />
      <Joystick />
      <InfoModal active={active} onClose={() => setActive(null)} />

      {/* cinematic fade-out on exit */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            className="absolute inset-0 z-[200] bg-neutral-950 grid place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            onAnimationComplete={onExit}
          >
            <motion.p
              className="text-neutral-400 text-sm tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              RETURNING TO PORTFOLIO…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
