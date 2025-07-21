## 專案結構

```
src/
├── components/
│   └── Scene.tsx          # 主要 3D 場景
├── App.tsx                # 主應用程式
└── main.tsx               # 入口點
```

## dependency
1.Vite - 快速建置工具，配置React、UnoCSS、ESLint、Prettier
2.React TypeScript
3.React Three Fiber 
4.UnoCSS，請配置基本的shortcuts
5.Rapier Physics
6.ESLint 主要用來檢查 語法錯誤 和 撰寫風格（linting），lint + fix，，ESLint 不做格式化（formatting）的事
7. Prettier 則專注於 程式碼格式化（formatting），例如縮排、括號空格、換行等

## 範例場景包含
1.三個會旋轉並掉落的球體
2.一個固定的灰色地面
3.基本的照明設置
4.物理碰撞效果