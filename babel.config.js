module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module:react-native-dotenv", {
        "moduleName": "react-native-dotenv"
      }],
      'babel-plugin-transform-typescript-metadata',
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose" : true }],
      "babel-plugin-parameter-decorator",
      [
        'react-native-reanimated/plugin', {
            relativeSourceLocation: true,
        },
    ]
    ]
  };
};
