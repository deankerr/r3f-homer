import { useTexture } from '@react-three/drei'

export function useMatcap() {
  const path = 'matcaps/64/3E2335_D36A1B_8E4A2E_2842A5-64px.png' //light gold w/ purple ref
  return useTexture(path)
}

// 'matcaps/64/hexboard/pink/C21338_920C24_E71C54_F34A7D-64px.png', //bubblegum pink
// 'matcaps/64/hexboard/pink/910E5A_E127C3_CF1CA3_C1158F-64px.png', //lilac
// 'matcaps/64/hexboard/pink/89204B_17080D_DA4377_F780B5-64px.png', //metalic pink

// 'matcaps/64/hexboard/red/9D282A_38191D_DFC6CD_D6495A-64px.png', // reflective metalac pink
// 'matcaps/64/hexboard/red/AC171C_FA8593_E84854_D3464E-64px.png', // salmon
// 'matcaps/64/hexboard/red/D04444_AF2F2F_8B2424_9B2C2C-64px.png', // matt pink

// 'matcaps/64/hexboard/red/AB2C2C_EBB4B3_561212_DE8484-64px.png', // bright matt pink
// 'matcaps/64/hexboard/red/98332E_4A100D_691A16_A85A5B-64px.png', // bright matt pink
// 'matcaps/64/hexboard/red/BD5345_460F11_732622_EDB7B1-64px.png', // bright reflective/metal pink
// 'matcaps/64/hexboard/pink/8A3B3D_DA5F62_461F20_BC7F81-64px.png', // light ref pink
// 'matcaps/64/hexboard/pink/8C5945_D4C0B6_C3A49C_430504-64px.png', // cloudy ref pink
// 'matcaps/64/hexboard/pink/6E2E36_D3A1A0_BD7175_C78C8B-64px.png', // light cloudy pink
// 'matcaps/64/hexboard/other/422509_C89536_824512_0A0604-64px.png', // pure gold

// 'matcaps/64/hexboard/other/74A192_041B0D_194C33_235B4C-64px.png', // bright emerald
// 'matcaps/64/hexboard/other/3E2335_D36A1B_8E4A2E_2842A5-64px.png', //light gold w/ purple ref
// 'matcaps/64/hexboard/other/7B5254_E9DCC7_B19986_C8AC91-64px.png', // bright fold w/ purple ref
// 'matcaps/64/hexboard/other/593E2C_E5D8A9_BC9F79_9F8A68-64px.png', // very cloud cream (try uprez)
