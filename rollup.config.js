import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const srcDir = './src';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [typescript({
        abortOnError: true,
        check: false,
        exclude: ['__tests__/**/*'],
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
            compilerOptions: {
                paths: null,
                rootDir: srcDir,
            },
            exclude: ['__tests__/'],
            include: [srcDir],
        }
    })]
};
