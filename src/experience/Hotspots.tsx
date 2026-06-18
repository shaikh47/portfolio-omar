import { useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { Interactable } from './Interactable'
import { resumeData } from '../data/resume'
import { DESK, EDUCATION_SLOTS_X, EXIT_DOOR, ROOM, SKILL_BOARD, WALL_X_WEST, WALL_Z } from './layout'
import { inputState } from './inputState'
import type { ActivePanel } from './types'

const labelStyle: CSSProperties = {
  pointerEvents: 'none',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  fontFamily: 'system-ui, sans-serif',
}

function Tag({ children, accent = '#3b82f6' }: { children: ReactNode; accent?: string }) {
  return (
    <div
      style={{
        ...labelStyle,
        padding: '4px 10px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        color: '#fff',
        background: 'rgba(15,23,42,0.7)',
        backdropFilter: 'blur(6px)',
        border: `1px solid ${accent}`,
        boxShadow: `0 4px 14px rgba(0,0,0,0.25)`,
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------- Certificates
function CertificatesWall({ onSelect }: { onSelect: (p: ActivePanel) => void }) {
  return (
    <group>
      <Html position={[0, ROOM.height - 1, WALL_Z + 0.1]} center distanceFactor={11}>
        <div style={{ ...labelStyle, fontSize: 26, fontWeight: 700, color: '#1e293b', letterSpacing: 2 }}>
          EDUCATION
        </div>
      </Html>
      {resumeData.education.map((edu, i) => {
        const x = EDUCATION_SLOTS_X[i] ?? EDUCATION_SLOTS_X[EDUCATION_SLOTS_X.length - 1]
        return (
          <Interactable key={i} position={[x, 2.9, WALL_Z + 0.05]} onClick={() => onSelect({ kind: 'education', index: i })}>
            {(hovered) => (
              <group>
                {/* frame */}
                <mesh castShadow position={[0, 0, 0]}>
                  <boxGeometry args={[1.9, 2.5, 0.12]} />
                  <meshStandardMaterial color={hovered ? '#fbbf24' : '#8d6e4b'} roughness={0.5} metalness={0.2} />
                </mesh>
                {/* mat / certificate */}
                <mesh position={[0, 0, 0.08]}>
                  <planeGeometry args={[1.55, 2.15]} />
                  <meshStandardMaterial
                    color="#fbfbf8"
                    emissive={hovered ? '#fde68a' : '#000000'}
                    emissiveIntensity={hovered ? 0.4 : 0}
                  />
                </mesh>
                {/* seal */}
                <mesh position={[0, -0.65, 0.1]}>
                  <circleGeometry args={[0.22, 32]} />
                  <meshStandardMaterial color="#b91c1c" />
                </mesh>
                <Html position={[0, 0.3, 0.12]} center distanceFactor={8}>
                  <div style={{ ...labelStyle, textAlign: 'center', width: 150 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{edu.institution}</div>
                    <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>{edu.degree}</div>
                    {edu.gpa && <div style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', marginTop: 6 }}>GPA {edu.gpa}</div>}
                  </div>
                </Html>
              </group>
            )}
          </Interactable>
        )
      })}
    </group>
  )
}

// ----------------------------------------------------------------- Projects
function ProjectsDesk({ onSelect }: { onSelect: (p: ActivePanel) => void }) {
  const accents = ['#06b6d4', '#a855f7', '#10b981']
  return (
    <group position={[DESK.x, 0, DESK.z]}>
      {/* desk */}
      <RoundedBox args={[2.6, 0.15, 4.4]} radius={0.04} position={[0, DESK.height, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#3b3f4a" roughness={0.4} metalness={0.3} />
      </RoundedBox>
      {[1, 0, -1].map((legZ) =>
        [-1, 1].map((legX) => (
          <mesh key={`${legZ}-${legX}`} position={[legX * 1.1, DESK.height / 2, legZ * 1.9]} castShadow>
            <boxGeometry args={[0.12, DESK.height, 0.12]} />
            <meshStandardMaterial color="#22262e" />
          </mesh>
        )),
      )}

      <Html position={[0, DESK.height + 3.1, 0]} center distanceFactor={11}>
        <div style={{ ...labelStyle, fontSize: 22, fontWeight: 700, color: '#1e293b', letterSpacing: 1 }}>PROJECTS</div>
      </Html>

      {/* floating holographic project cards facing room centre (-x) */}
      {resumeData.projects.map((proj, i) => {
        const z = (i - (resumeData.projects.length - 1) / 2) * 1.5
        const accent = accents[i % accents.length]
        return (
          <Interactable
            key={i}
            position={[-0.2, DESK.height + 1.2, z]}
            rotation={[0, -Math.PI / 2, 0]}
            onClick={() => onSelect({ kind: 'project', index: i })}
          >
            {(hovered) => (
              <group scale={hovered ? 1.08 : 1}>
                <mesh castShadow>
                  <boxGeometry args={[1.25, 0.85, 0.06]} />
                  <meshStandardMaterial
                    color={accent}
                    transparent
                    opacity={0.28}
                    emissive={accent}
                    emissiveIntensity={hovered ? 1.1 : 0.55}
                    roughness={0.1}
                  />
                </mesh>
                {/* base beam */}
                <mesh position={[0, -0.95, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
                  <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} transparent opacity={0.4} />
                </mesh>
                <Html position={[0, 0, 0.05]} center distanceFactor={7}>
                  <div style={{ ...labelStyle, textAlign: 'center', width: 130 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', textShadow: '0 1px 4px #000' }}>{proj.name}</div>
                  </div>
                </Html>
              </group>
            )}
          </Interactable>
        )
      })}
    </group>
  )
}

// ------------------------------------------------------------------- Skills
function SkillsBoard({ onSelect }: { onSelect: (p: ActivePanel) => void }) {
  const icons = resumeData.skills.slice(0, 6)
  return (
    <Interactable position={[WALL_X_WEST + 0.05, 0, SKILL_BOARD.z]} rotation={[0, Math.PI / 2, 0]} onClick={() => onSelect({ kind: 'skills' })}>
      {(hovered) => (
        <group>
          {/* board */}
          <mesh position={[0, 3, 0]} castShadow>
            <boxGeometry args={[5, 3.4, 0.12]} />
            <meshStandardMaterial
              color="#1e293b"
              emissive={hovered ? '#3b82f6' : '#0f172a'}
              emissiveIntensity={hovered ? 0.5 : 0.15}
              roughness={0.4}
            />
          </mesh>
          <Html position={[0, 4.25, 0.1]} center distanceFactor={11}>
            <div style={{ ...labelStyle, fontSize: 20, fontWeight: 700, color: '#1e293b', letterSpacing: 1 }}>SKILLS</div>
          </Html>
          {/* floating category chips */}
          {icons.map((cat, i) => {
            const col = i % 3
            const row = Math.floor(i / 3)
            return (
              <group key={i} position={[(col - 1) * 1.5, 3.6 - row * 1.5, 0.25]}>
                <mesh castShadow>
                  <boxGeometry args={[1.2, 0.9, 0.12]} />
                  <meshStandardMaterial color="#3b82f6" emissive="#2563eb" emissiveIntensity={0.4} roughness={0.3} />
                </mesh>
                <Html position={[0, 0, 0.08]} center distanceFactor={7}>
                  <div style={{ ...labelStyle, fontSize: 12, fontWeight: 700, color: '#fff' }}>{cat.label}</div>
                </Html>
              </group>
            )
          })}
        </group>
      )}
    </Interactable>
  )
}

// ------------------------------------------------------------------ Exit door
function ExitDoor({ onExit, playerPos }: { onExit: () => void; playerPos: RefObject<THREE.Vector3> }) {
  const [near, setNear] = useState(false)
  const fired = useRef(false)

  useFrame(() => {
    const d = Math.hypot(playerPos.current.x - EXIT_DOOR.x, playerPos.current.z - EXIT_DOOR.z)
    const isNear = d < 2.6
    if (isNear !== near) setNear(isNear)
    if (isNear && inputState.interact && !fired.current) {
      fired.current = true
      onExit()
    }
  })

  return (
    <Interactable position={[EXIT_DOOR.x, 0, EXIT_DOOR.z - 0.02]} onClick={onExit}>
      {(hovered) => (
        <group>
          {/* door slab */}
          <mesh castShadow position={[0, EXIT_DOOR.height / 2, 0]}>
            <boxGeometry args={[EXIT_DOOR.width, EXIT_DOOR.height, 0.1]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive={hovered || near ? '#22c55e' : '#15803d'}
              emissiveIntensity={hovered || near ? 0.8 : 0.35}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
          {/* EXIT sign above */}
          <mesh position={[0, EXIT_DOOR.height + 0.25, 0.06]}>
            <planeGeometry args={[1.2, 0.45]} />
            <meshStandardMaterial color="#16a34a" emissive="#22c55e" emissiveIntensity={1.2} toneMapped={false} />
          </mesh>
          <Html position={[0, EXIT_DOOR.height + 0.25, 0.08]} center distanceFactor={9}>
            <div style={{ ...labelStyle, fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: 3 }}>EXIT</div>
          </Html>
          {near && (
            <Html position={[0, 1.4, 0.2]} center distanceFactor={8}>
              <Tag accent="#22c55e">Press E or click to leave →</Tag>
            </Html>
          )}
        </group>
      )}
    </Interactable>
  )
}

export function Hotspots({
  onSelect,
  onExit,
  playerPos,
}: {
  onSelect: (p: ActivePanel) => void
  onExit: () => void
  playerPos: RefObject<THREE.Vector3>
}) {
  return (
    <group>
      <CertificatesWall onSelect={onSelect} />
      <ProjectsDesk onSelect={onSelect} />
      <SkillsBoard onSelect={onSelect} />
      <ExitDoor onExit={onExit} playerPos={playerPos} />
    </group>
  )
}
