
require.config({
    baseUrl: '../dist',

    paths: {
        'lodash': '../lib/lodash.min',
        'jasmine-boot': '../tests/jasmine-2.6.0/boot',
        'cfdg-parser': '../lib/cfdg-parser'
    },

    shim: {
    }
});

require(['jasmine-boot'], function () {
    require(['tests/spec'], function () {
        window.onload(null);
    });
});