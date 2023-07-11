import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

import { Lights, Ring } from '.'
import { Obelisk, Shard, Starfield, Temple, URLText } from './components'

export function Bastet() {
  const config = useControls('main', {
    orbitControls: true,
    r3fPerf: true,
  })

  //* camera
  const cameraProps = useControls(
    'camera',
    {
      position: [200, 18, 0],
      target: [0, 0, 0],
    },
    { collapsed: true }
  )

  return (
    <>
      <PerspectiveCamera
        fov={50}
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
        size={[4, 5]}
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
        amount={100}
        orbit={0.08}
        spread={300}
        size={[6, 8]}
      />

      <Ring
        Body={Shard}
        radius={1500}
        amount={200}
        orbit={0.04}
        spread={400}
        size={[15, 20]}
      />

      <Starfield />

      <Lights />

      <OrbitControls target={cameraProps.target} />
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
