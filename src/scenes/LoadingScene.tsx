import { Hud, PerspectiveCamera, Stars, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useNavigation } from 'react-router-dom'
import { Group } from 'three'

const speed = 0.01

export const LoadingScene = () => {
  const loading = useNavigation().state === 'loading'

  const starsRef = useRef<Group>(null!)
  useFrame(() => {
    if (!loading) return
    starsRef.current.rotation.y += speed
  })

  return (
    <Hud renderPriority={loading ? 1 : -1}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      {/* <color attach="background" args={['#000']} /> */}
      <group ref={starsRef}>
        <Stars />
      </group>
      <Text color={'white'} fontSize={1}>
        Loading
      </Text>
    </Hud>
  )
}
