import { useControls } from 'leva'

export default function Lights() {
  const ambientProps = useControls('Ambient light', {
    visible: true,
    color: 'white',
  })

  const directionalProps = useControls('Directional light', {
    visible: false,
    position: [1, 1, 1],
    color: 'white',
  })

  const pointProps = useControls('Point light', {
    visible: false,
    position: [10, 10, 10],
    color: 'white',
  })

  const spotProps = useControls('Spot light', {
    visible: false,
    position: [3, 2.5, 1],
    color: 'white',
  })

  return (
    <>
      <ambientLight {...ambientProps} />
      <directionalLight {...directionalProps} />
      <pointLight {...pointProps} />
      <spotLight {...spotProps} />
    </>
  )
}
