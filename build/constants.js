const path = require('path');
const packageJSON = require('../package.json');

const root = path.resolve(__dirname, '../');
const paths = {
    root,
    app: path.resolve(root, 'app'),
    assets: path.resolve(root, 'app/assets'),
    dist: path.resolve(root, 'dist'),
    normalizeCss: require.resolve('normalize.css'),
    babelCacheDir: path.join(root, '.cache'),
    publicPath: '/'
};

module.exports = {
    paths,
    packageVersion: packageJSON.version,
    babelConfig: packageJSON.babel,
    sourceDirs: [
        paths.app
    ],
    globalStylesDir: [
        path.resolve(paths.assets, 'styles/global'),
        path.resolve(paths.assets, 'fonts')
    ]
};
