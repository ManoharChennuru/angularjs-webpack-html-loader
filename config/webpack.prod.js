const webpack = require("webpack");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const helpers = require("./helpers");
const TerserPlugin = require("terser-webpack-plugin");

const mergedConfig = merge(commonConfig, {
    mode: "production",
    output: {
        publicPath: "/",
        filename: "[name].[contenthash].js",
        chunkFilename: "[id].[chunkhash].chunk.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                exclude: /(node_modules)/,
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./index.html", to: "/dest/" },
                { from: "./web.config.js", to: "/dest/" },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            ignoreOrder: false,
        }),
        new webpack.ProgressPlugin({
            dependenciesCount: 10000,
            percentBy: "entries",
        }),
    ],
});

module.exports = mergedConfig;
