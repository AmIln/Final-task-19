const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: "style-loader" },
          { loader: "css-modules-typescript-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "our project",
      template: "./src/index.html",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/shopping.svg", to: "shopping.svg" },
        { from: "public/Ivan.jpg", to: "Ivan.jpg" },
        { from: "public/Marta.jpg", to: "Marta.jpg" },
        { from: "public/Dmitriy.jpeg", to: "Dmitriy.jpeg" },
        { from: "public/basket.svg", to: "basket.svg" },
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
};
