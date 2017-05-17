require.config({
    baseUrl: 'dist',

    paths: {
        'lodash': '../lib/lodash.min',
        'cfdg-parser': '../lib/cfdg-parser'
    },

    shim: {
    }
});

require(['main']);