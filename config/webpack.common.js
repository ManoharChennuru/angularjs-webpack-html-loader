const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const helpers = require("./helpers");

module.exports = {
    entry: {
        app: './app/index.js'
    },
    resolve: {
        extensions: [".js"],
        symlinks: false,
        cacheWithContext: false,
    },
    module: {
        unsafeCache: true,
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["@babel/preset-env"]],
                            compact: process.env.NODE_ENV === "production",
                        },
                    },
                ],
            },
            {
                test: /\.html$i/,
                use: "html-loader",
            },
        ],
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "HTML Loader test",
            template: "./index.html",
            minify: true,
            inject: "body",
            meta: {
                viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
                "cache-control": { "http-equiv": "cache-control", content: "max-age=0" },
                "cache-control": { "http-equiv": "cache-control", content: "no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0" },
                expires: { "http-equiv": "expires", content: "Tue, 01 Jan 1980 1:00:00 GMT" },
                pragma: { "http-equiv": "pragma", content: "no-cache" },
            },
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
    ],
};
