require.config({
    baseUrl: 'dist',

    paths: {
        'lodash': '../lib/lodash.min',
    },

    shim: {
    }
});

require(['main']);