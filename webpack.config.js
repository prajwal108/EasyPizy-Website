const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/", // Entry point for your application
  output: {
    filename: "bundle.js", // Name of the output JavaScript bundle file
    path: path.resolve(__dirname, "dist"), // Output directory (create a 'dist' folder)
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: "babel-loader", // Use Babel to transpile JavaScript
          options: {
            presets: ["@babel/preset-env"], // Babel preset for modern JavaScript
          },
        },
      },
      {
        test: /\.handlebars$/, // Apply this rule to .handlebars files
        loader: "handlebars-loader", // Use Handlebars loader
      },
      {
        test: /\.css$/, // Apply this rule to .css files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          "css-loader", // CSS loader
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css", // Name of the output CSS bundle file
    }),
    new Dotenv(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
    ],
  },
};
