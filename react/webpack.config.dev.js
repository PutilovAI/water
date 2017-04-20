var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: "cheap-eval-source-map",
    entry: [
        'babel-polyfill',
        // necessary for hot reloading with IE:
        'eventsource-polyfill',
        // listen to code updates emitted by hot middleware:
        'webpack-hot-middleware/client',
        'isomorphic-fetch',

        './app/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'react-hot-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'stage-0',  'react'],
                            plugins: ['transform-runtime']
                        }
                    },

                ]
            },
            // {
            //     test: /\.(png|jpg)$/,
            //     loader: 'file-loader?name=[name].[ext]&context=./app/static'
            //     // use: ExtractTextPlugin.extract({
            //     //     use: [
            //     //         {},
            //     //     ]
            //     // })
            // },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file-loader?name=assets/img/[name].[ext]'
            },
            {
                test: /\.(ttf|woff|eot)$/,
                loader: 'file-loader?name=assets/fonts/[path][name].[ext]'
            },

            {
                test: /\.styl$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'stylus-loader?resolve url'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'app/static',
                to: 'static'
            },

        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'API_URL': JSON.stringify('http://127.0.0.1:8000')
        })
        //new ExtractTextPlugin('/css/')
    ],
};
