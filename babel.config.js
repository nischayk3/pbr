module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["transform-class-properties", "istanbul"],
  env: {
    test: {
      plugins: [["@babel/plugin-proposal-class-properties"]],
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },
};
