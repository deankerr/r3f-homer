import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { damp3 } from 'maath/easing'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'

import { Lights, Ring } from '.'
import { Obelisk, Shard, Starfield, Temple, URLText } from './components'

export function Bastet() {
  const config = useControls('main', {
    orbitControls: true,
    r3fPerf: false,
  })

  //* camera
  const cameraProps = useControls(
    'camera',
    {
      position: [550, 20, 0],
      target: [0, 0, 0],
    },
    { collapsed: true }
  )

  //* initial zoom in
  const zoomTime = 4
  const initTime = useRef<number>(Date.now())
  useFrame((state, delta) => {
    if (Date.now() - initTime.current > zoomTime * 1000 * 3) return
    damp3(state.camera.position, [260, 20, 0], zoomTime, delta)
  })

  return (
    <>
      <PerspectiveCamera
        fov={30}
        far={3000}
        position={cameraProps.position}
        makeDefault
      />

      <URLText text="DEAN.TAXI" />
      <Temple />

      <Ring
        Body={Shard}
        radius={400}
        amount={32}
        orbit={0.04}
        spread={30}
        size={[2, 3]}
      />

      <Ring
        Body={Obelisk}
        radius={600}
        amount={10}
        orbit={0.03}
        spread={1}
        size={[7, 7]}
      />

      <Ring
        Body={Shard}
        radius={1000}
        amount={200}
        orbit={0.1}
        spread={200}
        size={[3, 10]}
      />

      <Ring
        Body={Shard}
        radius={1000}
        amount={200}
        orbit={0.04}
        spread={200}
        size={[3, 10]}
      />

      <Starfield />

      <Lights />

      <OrbitControls
        enabled={config.orbitControls}
        enablePan={false}
        minDistance={150}
        maxDistance={600}
      />
      {config.r3fPerf && (
        <Perf
          position="bottom-left"
          antialias={false}
          logsPerSecond={2}
          chart={{ hz: 1, length: 30 }}
        />
      )}
    </>
  )
}
