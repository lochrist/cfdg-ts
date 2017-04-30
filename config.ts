///<reference path='node_modules/definitely-typed-requirejs/require.d.ts' />

require.config({
    baseUrl: 'dist',

    paths: {
        'lodash': '../lib/lodash.min',
    },

    shim: {
    }
});

require(['main']);