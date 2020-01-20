import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';

export default {
    input: 'src/wrapper.js',
    output: {
        name: 'QcVuetify',
        exports: 'named',
    },
    plugins: [
        resolve({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.vue']
        }),
        commonjs(),
        vue({
            css: true, // Dinamicamente injeta CSS como uma tag <style>
            compileTemplate: true, // Explicitamente converte template para função render
        }),
        buble(), // Transpila para ES5
    ],
};