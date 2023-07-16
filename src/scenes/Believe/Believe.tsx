import { CameraControls, GradientTexture, useTexture } from '@react-three/drei'
import { Object3DNode, extend, useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Water } from 'three-stdlib'

extend({ Water })
declare module '@react-three/fiber' {
  interface ThreeElements {
    water: Object3DNode<Water, typeof Water>
  }
}

export default function Believe() {
  const camera = useThree(state => state.camera)

  const cameraControlsRef = useRef<CameraControls>(null!)
  useEffect(() => {
    void cameraControlsRef.current.setLookAt(0, 30, 0, 0, 30, -50)
  }, [camera.position])

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <Background />

      <Sea />
      <axesHelper args={[10]} />
    </>
  )
}

const Background = () => {
  const width = 1000
  const height = 110

  const config = useControls('background', {
    visible: true,
  })

  return (
    <mesh position={[0, height / 2, -100]} {...config}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial>
        <GradientTexture
          stops={[0, 0.1, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8]}
          colors={[
            'magenta',
            'hotpink',
            'magenta',
            'hotpink',
            'magenta',
            'orange',
            'khaki',
            'orange',
          ]}
        />
      </meshBasicMaterial>
    </mesh>
  )
}

const Sea = () => {
  const ref = useRef<Water>(null!)

  const waterNormals = useTexture('waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

  const geom = useMemo(() => new THREE.PlaneGeometry(1000, 1000), [])

  const config = useControls('water', {
    visible: true,
    sunDirection: [0, 0, 0],
  })

  const shaderConfig = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(...config.sunDirection),
      sunColor: 'orange',
      waterColor: 'royalblue',
      distortionScale: 3.7,
      fog: false,
    }),
    [waterNormals, config.sunDirection]
  )

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta * 0.1
    }
  })

  return (
    <water
      ref={ref}
      args={[geom, shaderConfig]}
      visible={config.visible}
      rotation-x={-Math.PI / 2}
      position={[0, 0, 400]}
    />
  )
}

// import { Water2 } from 'three-stdlib'
// extend({ Water2 })
// const Sea2 = () => {
//   const geom = useMemo(() => new THREE.PlaneGeometry(100, 100), [])

//   const normalMap0 = useTexture('Water_1_M_Normal.jpg')
//   const normalMap1 = useTexture('Water_2_M_Normal.jpg')

//   const config = { normalMap0, normalMap1, color: 0xffffff }
//   return <water2 args={[geom, config]} rotation-x={-Math.PI / 2} />
// }
