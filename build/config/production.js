/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import {paths, sourceDirs, globalStylesDir} from '../constants';

const mainExtractPlugin = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    allChunks: true
});

module.exports = {
    devtool: 'source-map',
    output: {
        filename: '[name].[hash].js',
        path: paths.dist,
        publicPath: paths.publicPath,
        chunkFilename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                include: sourceDirs,
                use: [
                    'eslint-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                include: sourceDirs,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: '[name]-[hash:4].[ext]',
                            outputPath: 'assets/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            optigif: {
                                interlaced: false

                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            svgo: {
                                plugins: [
                                    {removeTitle: true},
                                    {removeViewBox: false},
                                    {removeEmptyAttrs: true},
                                    {removeComments: true},
                                    {sortAttrs: true},
                                    {minifyStyles: true}
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    paths.normalizeCss,
                    ...sourceDirs
                ],
                use: mainExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]-[hash:base64:3]'
                            }
                        },
                        'resolve-url-loader'
                    ]
                })
            },
            {
                test: /\.(sass|scss)$/,
                include: sourceDirs,
                exclude: globalStylesDir,
                use: mainExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]-[hash:base64:3]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'expanded'
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
                })
            },
            {
                test: /\.(sass|scss)$/,
                include: globalStylesDir,
                use: mainExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?minimize',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'expanded'
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
                })
            }

        ]
    },
    plugins: [
        mainExtractPlugin,
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(paths.dist, {root: paths.root, allowExternal: true}),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            mangle: false,
            sourceMap: true,
            output: {
                comments: false
            }
        })
    ]
};
