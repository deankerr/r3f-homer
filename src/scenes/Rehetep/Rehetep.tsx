import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

import { Lights, Ring } from '.'
import { Camera } from '.'
import { Obelisk, Shard, Starfield, Temple, URLText } from './components'

export function Component() {
  const config = useControls('main', {
    r3fPerf: false,
  })

  return (
    <>
      <URLText text="DEAN.TAXI" />
      <Temple />

      <Ring Body={Shard} radius={400} amount={32} orbit={0.04} spread={30} size={[2, 3]} />

      <Ring Body={Obelisk} radius={600} amount={10} orbit={0.03} spread={1} size={[7, 7]} />

      <Ring Body={Shard} radius={1000} amount={200} orbit={0.1} spread={200} size={[3, 10]} />

      <Ring Body={Shard} radius={1000} amount={200} orbit={0.04} spread={200} size={[3, 10]} />

      <Starfield />

      <Camera />
      <Lights />

      {config.r3fPerf && (
        <Perf position="bottom-left" antialias={false} logsPerSecond={2} chart={{ hz: 1, length: 30 }} />
      )}
    </>
  )
}
Component.displayName = 'Rehetep'
