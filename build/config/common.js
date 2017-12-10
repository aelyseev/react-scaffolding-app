/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {babelConfig, packageVersion, paths, sourceDirs} from '../constants';
import entities from '../entries/index';

const DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        app: entities.app,
        vendor: entities.vendors
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['app', 'node_modules']
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
                            {cacheDirectory: paths.babelCacheDir}
                        )
                    }
                ]
            },
            {
                test: /\.path/,
                include: sourceDirs,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.ya?ml/,
                include: sourceDirs,
                use: [
                    'json-loader', 'yaml-loader'
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|otf)$/,
                include: sourceDirs,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: path.join(paths.root, 'favicons'), to: paths.dist, flatten: true}
        ]),
        new FlowBabelWebpackPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(ru|en-gb)/),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise'
        }),
        new LodashModuleReplacementPlugin({
            collections: true,
            paths: true,
            shorthands: true
        }),
        new webpack.DefinePlugin({
            DEBUG: JSON.stringify(DEVELOPMENT_MODE),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            VERSION: JSON.stringify(packageVersion)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(paths.app, 'index.html'),
            inject: false,
            minify: DEVELOPMENT_MODE ? false : {removeComments: true, collapseWhitespace: true}
        })
    ]
};
