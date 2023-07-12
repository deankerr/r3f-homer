import { Box, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'

import { spiralPositions } from '@/util'

export function Camera() {
  //* camera
  const cameraProps = useControls(
    'camera',
    {
      position: [350, 20, 0],
      target: [0, 0, 0],
    },
    { collapsed: true }
  )

  //* initial zoom in
  // const zoomTime = 4
  // const initTime = useRef<number>(Date.now())
  // useFrame((state, delta) => {
  // if (Date.now() - initTime.current > zoomTime * 1000 * 3) return
  // damp3(state.camera.position, [260, 20, 0], zoomTime, delta)
  // const pos = state.camera.position
  // console.log(pos.x, pos.y, pos.z)
  // })

  const camPoints = spiralPositions(200, 100).map((p, i) => (
    <Box key={i} position={p} scale={2} />
  ))

  return (
    <>
      <PerspectiveCamera
        fov={30}
        far={3000}
        position={cameraProps.position}
        makeDefault
      />
      {/* {camPoints} */}
      <OrbitControls enablePan={false} minDistance={150} maxDistance={600} />
      {/* <CameraControls /> */}
    </>
  )
}
