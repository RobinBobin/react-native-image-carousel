import config from '@robinbobin/ts-eslint-prettier/eslint.config.mjs'
import configPluginReactHooks from '@robinbobin/ts-eslint-prettier/eslint.config.plugin.react.hooks.mjs'
import { ts } from '@robinbobin/ts-eslint-prettier/eslintRuleOptions/index.mjs'

export default [
  ...config,
  ...configPluginReactHooks,
  {
    rules: {
      '@typescript-eslint/no-invalid-void-type': [
        'error',
        { allowAsThisParameter: true }
      ],
      '@typescript-eslint/no-shadow': [
        'error',
        {
          ...ts.noShadow,
          allow: ['StyleSheet']
        }
      ],
      '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        {
          allow: [
            {
              from: 'file',
              name: [
                'BaseAnimation',
                'IImageCarouselModelInstance',
                'ISlideTransitionAnimationAccessibleImageCarouselModelInstance',
                'ReactNode',
                'StyleProp',
                'TImageRawData'
              ]
            }
          ],
          ignoreInferredTypes: true
        }
      ],
      'react-hooks/exhaustive-deps': 'error'
    }
  },
  {
    files: ['src/mst/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'func-names': 'off',
      'require-atomic-updates': ['error', { allowProperties: true }]
    }
  }
]
