require.config({
    baseUrl: 'dist',

    paths: {
        'lodash': '../lib/lodash.min',
        'mithril': '../lib/mithril',
        'cfdg-parser': '../lib/cfdg-parser'
    },

    shim: {
    }
});

require(['main']);