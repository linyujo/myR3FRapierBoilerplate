import 'three'

declare module 'three' {
  interface Scene {
    environmentIntensity?: number
    environmentRotation?: [number, number, number]
  }
}
