(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.index = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var iniParser = function iniParser(str) {
        var result = {
            length: 0
        };
        var section = false;
        var lines = str.replace(/(\r\n)/g, '\n').split('\n');
        lines.reduce(function (c, l, i) {
            if (/^\[(.*)\]$/g.test(l)) {
                section = /^\[(.*)\]$/g.exec(l)[1];
                result[section] = {
                    length: 0
                };
                result[result.length] = section;
                result.length++;
            } else if (/^(\w*)=(.*)$/g.test(l)) {
                var line = /^(\w*)=(.*)$/g.exec(l);
                var parent = section ? result[section] : result;
                parent[line[1]] = line[2];
                parent[parent.length] = line[1];
                parent.length++;
            }
            return;
        }, null);
        return result;
    };

    exports.default = iniParser;
    module.exports = exports['default'];
});
