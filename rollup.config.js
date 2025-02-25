import nodeResolve from '@rollup/plugin-node-resolve';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import copy from 'rollup-plugin-copy';

export default {
  input: 'dist/esm/index.js',
  output: {
    file: 'dist/plugin.js',
    format: 'iife',
    name: 'capacitorAppTrackingTransparency', // TODO: change this
    globals: {
      '@capacitor/core': 'capacitorExports',
    },
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      // allowlist of dependencies to bundle in
      // @see https://github.com/rollup/plugins/tree/master/packages/node-resolve#resolveonly
      resolveOnly: ['lodash'],
    }),
    generatePackageJson({
      baseContents: ({ scripts, ...pkg }) => pkg,
    }),
    copy({
      targets: [
        { src: 'ios/**/*', dest: 'dist/ios' },
        { src: 'CapacitorAppTrackingTransparency.podspec', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
      ],
    }),
  ],
};
