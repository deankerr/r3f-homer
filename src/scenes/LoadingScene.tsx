import { Box, Text } from '@react-three/drei'

export const LoadingScene = () => {
  console.log('LOADING!')
  return (
    <>
      {/* <Text>LOADING!!!</Text>
      <Box args={[10, 10, 10]} material-color={'red'} /> */}
      <div className="text-6xl text-red-600">Loading!</div>
    </>
  )
}
