export type InputState = {
  forward: number // W = +1, S = -1
  right: number // D = +1, A = -1
  interact: boolean // E / click on door
}

export type ActivePanel =
  | { kind: 'education'; index: number }
  | { kind: 'project'; index: number }
  | { kind: 'skills' }
