# Types 目录说明

这个目录用于集中管理项目中的所有 TypeScript 类型声明文件（`.d.ts`）。

## 文件结构

```
src/types/
├── README.md         # 本说明文档
├── vite-env.d.ts     # Vite 环境变量类型声明
├── modules.d.ts      # 模块类型声明（静态资源）
└── global.d.ts       # 全局类型声明
```

## 各文件用途

### `vite-env.d.ts`
- 声明 Vite 客户端类型
- 扩展环境变量类型（`import.meta.env`）

**示例**：
```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
}
```

### `modules.d.ts`
- 声明静态资源模块类型
- 让 TypeScript 识别非 TypeScript 文件的导入

**已支持的文件类型**：
- 3D 模型：`.glb`, `.gltf`
- 图片：`.png`, `.jpg`, `.jpeg`, `.svg`, `.gif`, `.webp`
- 音频：`.mp3`, `.wav`
- 数据：`.json`

**使用示例**：
```typescript
import modelUrl from '@/assets/model.glb'
import logoUrl from '@/assets/logo.png'
```

### `global.d.ts`
- 全局类型定义
- 扩展全局接口（如 `Window`、`Document` 等）

**使用示例**：
```typescript
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
  }
}
```

## 添加新的类型声明

根据需要在相应文件中添加：

1. **新的静态资源类型** → `modules.d.ts`
2. **环境变量** → `vite-env.d.ts`
3. **全局变量/接口** → `global.d.ts`
4. **特定功能模块** → 创建新的 `.d.ts` 文件

## 注意事项

- 所有 `.d.ts` 文件会被 TypeScript 自动识别（通过 `tsconfig.json` 的 `include: ["src"]`）
- 不需要手动 `import` 这些声明文件
- 修改类型声明后，可能需要重启 TypeScript 服务器（VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"）

