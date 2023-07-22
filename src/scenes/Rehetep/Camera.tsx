import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'

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

  return (
    <>
      <PerspectiveCamera fov={30} far={3000} position={cameraProps.position} makeDefault />
      {/* {camPoints} */}
      <OrbitControls enablePan={false} minDistance={150} maxDistance={600} />
      {/* <CameraControls /> */}
    </>
  )
}
