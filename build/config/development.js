/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import {babelConfig, paths, sourceDirs} from '../constants';

const port = 8000;
const proxyPort = 4000;

module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://0.0.0.0:${port}`,
            'webpack/hot/only-dev-server'
        ]
    },
    output: {
        filename: '[name].[hash].js',
        path: paths.dist,
        publicPath: paths.publicPath,
        chunkFilename: '[name].[hash].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        proxy: {
            '/api': `http://localhost:${proxyPort}`
        },
        disableHostCheck: true,
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000
        },
        historyApiFallback: true,
        stats: {
            assets: false,
            env: true,
            colors: true,
            entrypoints: true,
            reasons: false
        },
        host: '0.0.0.0',
        port,
        // contentBase: paths.dist,
        publicPath: paths.publicPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: sourceDirs,
                use: [
                    {
                        loader: 'babel-loader',
                        options: Object.assign(
                            babelConfig,
                            {plugins: ['react-hot-loader/babel'].concat(babelConfig.plugins)},
                            {cacheDirectory: paths.babelCacheDir}
                        )
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]-[hash:base64:3]'
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded'
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                include: sourceDirs,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
