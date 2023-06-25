import { Plane, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const size = 800

export function Floor() {
  const grid = useTexture('/grid.png')
  grid.wrapS = THREE.RepeatWrapping
  grid.wrapT = THREE.RepeatWrapping
  grid.repeat.set(50, 50)

  return (
    <>
      {/* <gridHelper
        args={[size, 40, 'orange', 'orange']}
        position={[400, 1, 0]}
      />
      <Plane
        args={[size, size]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[400, 1, 0]}
      >
        <meshStandardMaterial color="black" />
      </Plane> */}

      <Plane args={[size, size]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* <meshStandardMaterial map={grid} color={'orange'} /> */}
        <meshBasicMaterial map={grid} color={'#ffb23e'} />
      </Plane>
    </>
  )
}
