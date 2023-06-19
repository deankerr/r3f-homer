import { Chest } from './Chest'
import { Head } from './Head'
import { Pants } from './Pants'

const skinColor = '#FFD700'

type Props = JSX.IntrinsicElements['group']

export function Homer(props: Props) {
  return (
    <group {...props}>
      <Head skinColor={skinColor} rotation={[0, 0, 0]} />
      <Chest skinColor={skinColor} />
      <Pants />
    </group>
  )
}
