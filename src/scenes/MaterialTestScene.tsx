import {
  Circle,
  Environment,
  Icosahedron,
  Image,
  OrbitControls,
  Sphere,
  useTexture,
} from '@react-three/drei'
import { EffectComposer, Scanline, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

export function MaterialTestScene() {
  // const envTexture = useTexture('/resting_place_1k.hdr')
  // const envTexture = useTexture('/alyson.png')
  // envTexture.mapping = THREE.EquirectangularReflectionMapping

  const mat = (
    <meshPhysicalMaterial
      color={'white'}
      transmission={1.0}
      roughness={0.0}
      ior={1.7}
      thickness={0.5}
      specularIntensity={1.0}
      clearcoat={1.0}
      sheen={2}
      sheenColor={'red'}
      // map={envTexture}
    />
  )

  return (
    <>
      <Sphere position={[-2, 4, 0]}>{mat}</Sphere>

      <Icosahedron position={[2, 4, 0]}>{mat}</Icosahedron>

      {/* stage */}
      <Image url="/alyson.png" position={[0, 5, -6]} scale={[20, 13]} />
      <Circle
        args={[10]}
        rotation={[-Math.PI / 2, 0, 0]}
        material-color={'sienna'}
      />
      <Environment files="/resting_place_1k.hdr" background />

      {/* light */}
      <ambientLight />

      {/* effect */}
      <EffectComposer>
        <Scanline
          blendFunction={BlendFunction.OVERLAY} // blend mode
          density={1.25} // scanline density
        />

        <Vignette
          offset={0.5} // vignette offset
          darkness={0.5} // vignette darkness
          eskil={false} // Eskil's vignette technique
          blendFunction={BlendFunction.OVERLAY} // blend mode
        />
      </EffectComposer>

      {/* utility */}
      <OrbitControls autoRotate />
      <axesHelper args={[20]} />
    </>
  )
}
