const path = require("path");

module.exports = {
  entry: "src/firebase.js", // Entry point for your application
  output: {
    filename: "bundle.js", // Name of the output bundle file
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
    ],
  },
};
