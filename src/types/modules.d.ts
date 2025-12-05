// 静态资源模块类型声明

// 3D 模型文件
declare module '*.glb' {
  const src: string
  export default src
}

declare module '*.gltf' {
  const src: string
  export default src
}

// 图片文件
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

// 音频文件
declare module '*.mp3' {
  const src: string
  export default src
}

declare module '*.wav' {
  const src: string
  export default src
}

// 其他资源
declare module '*.json' {
  const value: any
  export default value
}

