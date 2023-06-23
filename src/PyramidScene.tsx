/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Octahedron,
  OrbitControls,
  Plane,
  Stats,
  Tetrahedron,
} from '@react-three/drei'

import { Orbit } from './components'

export function PyramidScene() {
  return (
    <>
      {/* <Octahedron args={[10]}>
        <meshStandardMaterial color="black" vertexColors={true} />
      </Octahedron> */}

      <mesh>
        <octahedronGeometry args={[10]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="orange" />
      </Plane>

      <Orbit y={0.01}>
        <directionalLight position={[50, 25, 0]} />
      </Orbit>
      {/* Utility */}
      {/* <axesHelper args={[10]} /> */}
      <gridHelper args={[100, 50]} />
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={0.1} />
      <Stats />
    </>
  )
}
