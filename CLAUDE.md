# React Three Fiber Starter Kit

## Package Manager

本專案使用 **pnpm** 作為 node_modules 安裝工具。

```bash
pnpm install    # 安裝依賴
pnpm dev        # 啟動開發伺服器 (port 3100)
pnpm build      # 建置專案
pnpm lint       # ESLint 檢查
pnpm lint:fix   # ESLint 自動修復
pnpm format     # Prettier 格式化
```

## Dependencies

### Production Dependencies
| 套件 | 版本 | 說明 |
|------|------|------|
| react | ^19.1.0 | React 核心 |
| react-dom | ^19.1.0 | React DOM |
| three | ^0.178.0 | Three.js 3D 引擎 |
| @react-three/fiber | ^9.1.0 | React Three Fiber - React 的 Three.js 渲染器 |
| @react-three/drei | ^10.6.0 | R3F 常用輔助元件集 |
| @react-three/rapier | ^1.4.0 | Rapier 物理引擎整合 |
| leva | ^0.10.0 | GUI 控制面板 |
| r3f-perf | ^7.2.3 | R3F 效能監測工具 |

### Dev Dependencies
| 套件 | 版本 | 說明 |
|------|------|------|
| vite | ^5.0.8 | 建置工具 |
| typescript | ^5.2.2 | TypeScript |
| @vitejs/plugin-react | ^4.2.1 | Vite React 插件 |
| unocss | ^0.58.0 | 原子化 CSS 框架 |
| @unocss/vite | ^0.58.0 | UnoCSS Vite 插件 |
| eslint | ^8.55.0 | 程式碼檢查 |
| prettier | ^3.1.1 | 程式碼格式化 |
| @types/react | ^18.2.43 | React 型別定義 |
| @types/react-dom | ^18.2.17 | React DOM 型別定義 |
| @types/three | ^0.160.0 | Three.js 型別定義 |
| @types/node | ^24.10.1 | Node.js 型別定義 |
| three-stdlib | ^2.36.1 | Three.js 標準函式庫 |

## CSS 工具

本專案使用 **UnoCSS** 作為 CSS 工具，是一個原子化 CSS 引擎。

## Vite 配置與路徑別名

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```

**使用方式**：
```typescript
import { Scene } from '@/components/Scene'
import modelUrl from '@/assets/model.glb'
```

**開發伺服器配置**：
- Host: `true` (允許外部存取)
- Port: `3100`

## TypeScript 型別定義

型別定義集中在 `src/types/` 目錄：

| 檔案 | 用途 |
|------|------|
| `vite-env.d.ts` | Vite 環境變數型別 (`import.meta.env`) |
| `modules.d.ts` | 靜態資源模組型別 (glb, gltf, png, jpg, mp3 等) |
| `global.d.ts` | 全域型別定義 (擴展 Window 等) |

**已支援的靜態資源型別**：
- 3D 模型: `.glb`, `.gltf`
- 圖片: `.png`, `.jpg`, `.jpeg`, `.svg`, `.gif`, `.webp`
- 音訊: `.mp3`, `.wav`
- 資料: `.json`

## 專案結構

```
src/
├── components/
│   └── Scene.tsx          # 主要 3D 場景
├── types/
│   ├── vite-env.d.ts      # Vite 環境變數型別
│   ├── modules.d.ts       # 靜態資源模組型別
│   └── global.d.ts        # 全域型別定義
├── App.tsx                # 主應用程式
└── main.tsx               # 入口點
```

## 範例場景

預設場景包含：
1. 三個會旋轉並掉落的球體
2. 一個固定的灰色地面
3. 基本的照明設置
4. Rapier 物理碰撞效果

## 程式碼風格

- **ESLint**: 語法錯誤與撰寫風格檢查 (不做格式化)
- **Prettier**: 程式碼格式化 (縮排、括號空格、換行等)