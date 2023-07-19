import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'

export function useMatcap() {
  // const path = 'matcaps/board/3E2335_D36A1B_8E4A2E_2842A5-64px.png' //light gold w/ purple ref
  const { npath } = useControls('hex', {
    npath: { value: 0, min: 0, max: matcapPaths.length - 1, step: 1 },
  })
  const path = matcapPaths[npath] //light gold w/ purple ref
  return useTexture(path)
}

export function useNormal(label: string, value = 0) {
  const { normal } = useControls(label, {
    normal: { value, min: 0, max: normalPaths.length - 1, step: 1 },
  })

  const texture = useTexture(normalPaths[normal])
  return texture
}
const normalPaths = [
  'normals/1324-normal.jpg',
  'normals/2563-normal.jpg',
  'normals/4918-normal.jpg',
  'normals/6624-normal.jpg',
  'normals/7146-normal.jpg',
  'normals/99232450425c8132b17dbccf65da365a.jpg',
  'normals/brick-normal.jpg',
  'normals/cr_wallpaper1_NRM.jpg',
  'normals/fig29.png',
  'normals/floor2_ddn.jpg',
  'normals/forestfloornrmii7.jpg',
  'normals/metal1_normalmap.jpg',
  'normals/normal.jpg',
  'normals/normalmap_tile_even.jpg',
  'normals/normalmap1.jpg',
  'normals/Rock_01_local.jpg',
  'normals/stage7.jpg',
  'normals/stone_wall_normal_map.jpg',
  'normals/Wall3_normalmap.jpg',
  'normals/Worn Temple Wall.jpg',
  'normals/wrinkle-normal.jpg',
  'normals/02.jpg',
  'normals/242-normal.jpg',
  'normals/243-normal.jpg',
  'normals/295-normal.jpg',
  'normals/879-normal.jpg',
]

// 'matcaps/64/hexboard/C21338_920C24_E71C54_F34A7D-512px.png', //bubblegum pink
// 'matcaps/64/hexboard/910E5A_E127C3_CF1CA3_C1158F-512px.png', //lilac
// 'matcaps/64/hexboard/89204B_17080D_DA4377_F780B5-512px.png', //metalic pink

// 'matcaps/64/hexboard/9D282A_38191D_DFC6CD_D6495A-512px.png', // reflective metalac pink
// 'matcaps/64/hexboard/AC171C_FA8593_E84854_D3464E-512px.png', // salmon
// 'matcaps/64/hexboard/D04444_AF2F2F_8B2424_9B2C2C-512px.png', // matt pink

// 'matcaps/64/hexboard/AB2C2C_EBB4B3_561212_DE8484-512px.png', // bright matt pink
// 'matcaps/64/hexboard/98332E_4A100D_691A16_A85A5B-512px.png', // bright matt pink
// 'matcaps/64/hexboard/BD5345_460F11_732622_EDB7B1-512px.png', // bright reflective/metal pink
// 'matcaps/64/hexboard//8A3B3D_DA5F62_461F20_BC7F81-512px.png', // light ref pink
// 'matcaps/64/hexboard//8C5945_D4C0B6_C3A49C_430504-512px.png', // cloudy ref pink
// 'matcaps/64/hexboard//6E2E36_D3A1A0_BD7175_C78C8B-512px.png', // light cloudy pink
// 'matcaps/64/hexboard/r/422509_C89536_824512_0A0604-512px.png', // pure gold

// 'matcaps/64/hexboard/r/74A192_041B0D_194C33_235B4C-512px.png', // bright emerald
// 'matcaps/64/hexboard/r/3E2335_D36A1B_8E4A2E_2842A5-512px.png', //light gold w/ purple ref
// 'matcaps/64/hexboard/r/7B5254_E9DCC7_B19986_C8AC91-512px.png', // bright fold w/ purple ref
// 'matcaps/64/hexboard/r/593E2C_E5D8A9_BC9F79_9F8A68-512px.png', // very cloud cream (try uprez)
// 'matcaps/64/hexboard//C21338_920C24_E71C54_F34A7D-512px.png', //bubblegum pink
const matcapPaths = [
  'matcaps/board/3E2335_D36A1B_8E4A2E_2842A5-64px.png',
  'matcaps/board/6E2E36_D3A1A0_BD7175_C78C8B-64px.png',
  'matcaps/board/7B5254_E9DCC7_B19986_C8AC91-64px.png',
  'matcaps/board/8A3B3D_DA5F62_461F20_BC7F81-64px.png',
  'matcaps/board/8A3B3D_DA5F62_461F20_BC7F81-512px.png',
  'matcaps/board/8C5945_D4C0B6_C3A49C_430504-64px.png',
  'matcaps/board/9D282A_38191D_DFC6CD_D6495A-64px.png',
  'matcaps/board/74A192_041B0D_194C33_235B4C-64px.png',
  'matcaps/board/181F1F_475057_616566_525C62-64px.png',
  'matcaps/board/593E2C_E5D8A9_BC9F79_9F8A68-64px.png',
  'matcaps/board/910E5A_E127C3_CF1CA3_C1158F-64px.png',
  'matcaps/board/89204B_17080D_DA4377_F780B5-64px.png',
  'matcaps/board/98332E_4A100D_691A16_A85A5B-64px.png',
  'matcaps/board/422509_C89536_824512_0A0604-64px.png',
  'matcaps/board/AB2C2C_EBB4B3_561212_DE8484-64px.png',
  'matcaps/board/AC171C_FA8593_E84854_D3464E-64px.png',
  'matcaps/board/BD5345_460F11_732622_EDB7B1-64px.png',
  'matcaps/board/C21338_920C24_E71C54_F34A7D-64px.png',
  'matcaps/board/D04444_AF2F2F_8B2424_9B2C2C-64px.png',
]

// '773012_AE5124_4D1908_340F04-512px.png', // wood

// '72625B_F0DFD0_D9BAA5_C3A595-512px.png', // silver
// '6E7181_D1CFDF_ABAFC7_B4BCCE-512px.png', // silver

// '593E2C_E5D8A9_BC9F79_9F8A68-512px.png', // rose gold
// '515151_DCDCDC_B7B7B7_9B9B9B-512px.png', // silver d edge
// '4F4C45_A7AEAA_7A8575_9D97A2-512px.png', // green mineral
// '46804D_CBE9AC_90B57C_95D38F-512px.png', // emerald b

// '3F3A2F_91D0A5_7D876A_94977B-512px.png', // rose gold d
// '0A0A0A_A9A9A9_525252_747474-512px.png', // black metal
// '624541_FCD0C6_E4A19A_FCBCB4-512px.png', // rose gold
