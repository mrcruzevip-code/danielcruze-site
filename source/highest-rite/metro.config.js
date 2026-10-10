const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const path = require("node:path");
config.watchFolders = [...(config.watchFolders || []), path.join(path.dirname(require.resolve("react-native-css-interop/package.json")), ".cache")];

module.exports = withNativeWind(config, {
  input: "./global.css",
  // Force write CSS to file system instead of virtual modules
  // This fixes iOS styling issues in development mode
  forceWriteFileSystem: true,
});
