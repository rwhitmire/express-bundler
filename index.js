var glob = require('glob');

module.exports = function(options) {
    var bundles = {};

    for (var key in options.bundles) {
        var globs = options.bundles[key];

        bundles[key] = [];

        globs.forEach(function(str) {
            var flist = glob.sync(str);
            bundles[key] = bundles[key].concat(flist);
        });
    }

    return function bundler(req, res, next) {
        res.locals.bundles = bundles;
        next();
    };
};