import { useEffect, useState } from 'react'
import { Vector3 } from 'three'

export function ringPositions(radius: number, amount: number) {
  const positions: Vector3[] = []

  for (let i = 0; i < amount; i++) {
    const angle = (i / amount) * 2 * Math.PI
    const x = radius * Math.sin(angle)
    const z = radius * Math.cos(angle)
    positions.push(new Vector3(x, 0, z))
  }

  return positions
}

export function spiralPositions(radius: number, amount: number) {
  const positions: Vector3[] = []

  for (let i = 0; i < amount; i++) {
    const angle = 0.1 * i
    const x = radius * angle * Math.cos(angle)
    const z = radius * angle * Math.sin(angle)
    positions.push(new Vector3(x, 0, z))
  }

  return positions
}

export function useRemountKey() {
  const [state, setState] = useState(0)

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'R') {
      console.log('remount!')
      setState(Date.now())
    }
  }

  return state
}

/* 
  camera rotation
  useFrame(state => {
    if (config.rotateCam && !config.orbitControls) {
      // rotate
      const angle = state.clock.elapsedTime
      state.camera.position.x = Math.sin(angle / 10) * cameraProps.position[2]
      state.camera.position.z = Math.cos(angle / 10) * cameraProps.position[2]
      state.camera.lookAt(new THREE.Vector3(...cameraProps.target))
    }
  })

*/
