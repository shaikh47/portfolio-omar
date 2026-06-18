import type { InputState } from './types'

// Module-level input store shared by the keyboard hook, the touch joystick
// (both writers) and the render loop / hotspots (readers). Using a singleton
// rather than a passed-around ref keeps the per-frame writes out of React's
// render path. Only one Experience is mounted at a time.
export const inputState: InputState = { forward: 0, right: 0, interact: false }
