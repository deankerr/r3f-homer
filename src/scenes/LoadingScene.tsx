import { Hud, PerspectiveCamera, Plane, Stars, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useNavigation } from 'react-router-dom'
import { Group } from 'three'

const test = true
const speed = 0.01

export const LoadingScene = () => {
  const loading = useNavigation().state === 'loading' || test === true

  const starsRef = useRef<Group>(null!)
  useFrame(() => {
    starsRef.current.rotation.y += speed
  })

  return (
    <Hud renderPriority={loading ? 1 : -1}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <color attach="background" args={['#000']} />
      <group ref={starsRef}>
        <Stars />
      </group>
      <Text color={'pink'}>Loading</Text>
    </Hud>
  )
}
