const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const helpers = require("./helpers");

module.exports = merge(commonConfig, {
    mode: "development",
    output: {
        pathinfo: false,
        filename: "[name].bundle.js",
    },
    devServer: {
        open: true,
        watchContentBase: true,
        historyApiFallback: true,
        hot: true,
        compress: false,
        port: 9000,
    },
});
