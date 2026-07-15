import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

// =============================================================
// ملاحظة إصلاح مهمة:
// كان هذا الملف يقتصر سابقاً على فحص ملفات '**/*.{js,jsx}' فقط،
// بينما كل الملفات الفعلية في المشروع هي '.ts' / '.tsx'. النتيجة
// كانت أن أمر `npm run lint` لا يفحص أي ملف على الإطلاق (ينجح دائماً
// بدون تحذيرات لأنه لا يجد شيئاً ليفحصه!). تمت إضافة دعم TypeScript
// الكامل عبر typescript-eslint وتصحيح أنماط الملفات المطابقة.
// =============================================================
export default tseslint.config(
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // تعطيل القاعدة العامة لصالح نسخة TypeScript المدركة للأنواع
      // (تتجاهل type-only imports وتتعامل بشكل صحيح مع الأنواع)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
    },
  },
)
