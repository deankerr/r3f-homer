import { useFBX } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group']

export function Mask(props: Props) {
  return (
    <group {...props}>
      <primitive object={useFBX('/model/geisha_devil.fbx')} />
    </group>
  )
}
