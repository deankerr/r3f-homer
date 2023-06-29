import { Center, Edges, Float, Text3D } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group'] & { text: string }

export function PyrText({ text, ...group }: Props) {
  return (
    <Float>
      <Center {...group}>
        <Text3D font={'font/bigblue.json'} size={6} height={10}>
          {text}
          {/* <meshBasicMaterial color={'black'} /> */}
          <meshStandardMaterial />
          {/* <meshBasicMaterial /> */}
          <Edges scale={1.0} threshold={15} color="orange" />
        </Text3D>
      </Center>
    </Float>
  )
}
