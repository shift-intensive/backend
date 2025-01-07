import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    typescript: true
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'ts/consistent-type-imports': 'off'
    }
  }
);
