const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the workspace root (to allow importing from the parent directory)
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to find node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Force common dependencies to resolve to the example app's node_modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react': path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-biotp': workspaceRoot,
};

// 4. Exclude the root node_modules for react and react-native to prevent duplicates
const modulesToBlock = [
  path.resolve(workspaceRoot, 'node_modules/react'),
  path.resolve(workspaceRoot, 'node_modules/react-native'),
];

config.resolver.blockList = [
  ...modulesToBlock.map(
    (modulePath) =>
      new RegExp(`^${modulePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/.*$`)
  ),
];

module.exports = config;
